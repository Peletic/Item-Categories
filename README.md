# Item-Categories
Node.js project that uses the NotEnoughUpdates-Repo to find all the items from a specific item category and then output them in the syntax of a certain third-party application.

## How do I use this?
To start off, figure out which item category(ies) you wish to find. You can figure out which ones you want by looking at the bottom line of an item's lore.
Ex: Most pet skins have the tag `EPIC COSMETIC` at the bottom of their lore.
Thus, if you would like to find all the pet skins/cosmetics you would add `"cosmetic"` to categories.toml.
To add an entry to categories.toml you must enter a `string` inside the square brackets (AKA an array).
If there is another entry after what you just put, then add a comma after the quotation marks. If there isn't then the syntax should end in `"]`.

### Prerequisites
To run the program you need [Node.js](https://nodejs.org/en) installed. You can install it from https://nodejs.org/en.
Subsequently, you need [NPM](https://nodejs.org/en/download/package-manager) (Node Package Manager) installed. If, when you installed Node.js, you used the default settings then you already have NPM installed.
If you had changed the settings then re-run the Node.js installer and make sure that it installs NPM with it.

### Installing Dependencies/Running
In your terminal (e.g. cmd prompt, powershell, terminal) move directories to where this is extracted.
Then run the command `npm install`.
Wait for the command to finish.
To start the program run `npm run start`.
Once it is completed you will find the files `true_blacklist.txt` and `blacklist.txt`. For both of these, you can simply copy and paste the file into your filter.json in the corresponding sections.
