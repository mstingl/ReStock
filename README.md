
# ReStock.js <img src="https://cdn.voltane.eu/assets/minecraft/chest_animated.gif" height="50px" style="transform:translateY(-8px)"/>
__A minimal Loottable Chest Refill craftscript__

***

__Want to support us?__

__[☕ Donate a cup of coffee on patreon ](https://www.patreon.com/voltane_eu)__

__[<img src="https://cdn.voltane.eu/logo/icon/icon-hexagon.svg" width="20px" height="25px"/> Contribute to our open-source projects](https://github.com/Voltane-EU)__

__[<img src="https://cdn.voltane.eu/assets/discord/nitro-boost.svg" width="20px" height="25px"/> Boost / Join our Discord server ](https://discord.voltane.eu/)__

__[<img src="https://cdn.voltane.eu/assets/minecraft/grass_block.png" width="20px"/> Join our modded minecraft server ](https://mc.play.voltane.eu/)__


***



## Prerequisites
_You will need:_
- A [.json file with an array of chest coordinates](https://minecraft.gamepedia.com/Loot_table) that you want to refill.
- A [.json loottable](https://minecraft.gamepedia.com/Loot_table) (if you want to use a custom loottable).
- The [WorldEdit](https://enginehub.org/worldedit/) Plugin.
- The [Rhino 1.7.11 (or higher)](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Download_Rhino) Library.

<br/>

## Instructions
1. Install WorldEdit on your Server.
1. Extract the Rhino Library `lib/rhino-{version}.jar`
   - to the `plugins/` or `plugins/WorldEdit` folder on bukkit.
   - to the `mods/` folder on other platforms.
1. Place the craftscript to `%serverroot%/config/worldedit/craftscripts/`.
1. In the same directory create a folder called `restock`.
1. and place your .json chest array file into that folder (name it `default.json` if you want to omit the filename on command execution).

<br/>

## Usage
_Command syntax:_\
`/cs restock <namespace/lootTable> <forceReplace> <coordFile>`

__namespace/lootTable [[?]](mcforge.readthedocs.io/en/latest/items/loot_tables/):__
- Which loottable to fill from.
- eg. `mctools:chests/loot_table`

__forceReplace [true|false]:__
- If blocks that aren't chests should become chests
```diff
- BE VERY CAREFUL WITH THIS
- TRIPPLE CHECK IF YOUR COORDS ARE CORRECT
- IT CAN'T BE UNDONE!
```
__coordFile [restock/loot]:__
- The file with coordinates of chests to fill (without `.json`)
- You can leave out this argument if your file is called `default.json`.
- Currently the json looks like this: \
`[[54, -70, 28, -118],...] or [[ID, X, Y, Z],...]`
- If you need to generate this file take a look at [this project](#).

***
