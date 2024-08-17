const {createUnauthenticatedAuth} = require('@octokit/auth-unauthenticated')
const {request} = require("@octokit/request");
const fs = require('fs')
const decompress = require("decompress");
const toml = require("toml")
const categories = toml.parse(fs.readFileSync(__dirname + "/categories.toml").toString())["item_categories"]

async function fetchSkinItemIds() {
    const auth = await createUnauthenticatedAuth({
        reason: 'Downloading a useful repo.'
    })

    const requestWithAuth = request.defaults({
        request: {
            hook: auth.hook,
        },
        mediaType: {
            previews: ["machine-man"],
        },
    });

    const req = await requestWithAuth('GET /repos/{owner}/{repo}/zipball/{ref}',
        {
            owner: 'NotEnoughUpdates',
            repo: 'NotEnoughUpdates-REPO',
            ref: '',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

    const buffer = Buffer.from(req.data)

    if (fs.existsSync('./repo.zip')) fs.rmSync('./repo.zip')
    if (fs.existsSync('./repo')) fs.rmSync('./repo', {recursive: true})

    fs.writeFileSync('./repo.zip', buffer)

    await decompress('./repo.zip', './repo').then(files => {
        console.log('Done downloaded & extracting!')
    })

    fs.renameSync('./repo/' + fs.readdirSync('./repo')[0], './cache/')

    fs.rmSync('./repo.zip')
    fs.rmdirSync('./repo')

    console.log('Done moving files!')

    const itemFiles = fs.readdirSync('./cache/items')
    const itemData = []

    for (const file of itemFiles) {
        const item = JSON.parse(fs.readFileSync('./cache/items/' + file).toString())
        itemData.push(item)
    }

    console.log("Done reading item files!")

    const skinItems = itemData.filter(item => item.lore[item.lore.length -1] && (categories.some(entry => item.lore[item.lore.length -1].toLowerCase().includes(entry.toString().toLowerCase()))));

    return skinItems.map(item => item.internalname)
}

async function formatData() {
    if (fs.existsSync("./blacklist.txt")) fs.rmSync("./blacklist.txt")
    if (fs.existsSync("./trueblacklist.txt")) fs.rmSync("./trueblacklist.txt")

    const itemIds = await fetchSkinItemIds()
    const tBL = JSON.stringify(itemIds, null, 4).replaceAll("[", "").replaceAll("]", "")
    const bl = JSON.stringify(itemIds.map(id => id + "=global:true"), null,  4).replaceAll("[", "").replaceAll("]", "")

    fs.writeFileSync("./blacklist.txt", bl)
    fs.writeFileSync("./trueblacklist.txt", tBL)
}

formatData()