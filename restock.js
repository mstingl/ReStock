importPackage(Packages.com.sk89q.worldedit); //Setup all the worldedit items
importPackage(Packages.com.sk89q.worldedit.blocks);
importPackage(Packages.com.sk89q.worldedit.world.block);
importPackage(Packages.com.sk89q.jnbt);

context.checkArgs(2, 3, "<namespace/lootTable> <forceReplace> <coordFile>"); //ensure atleast two/ maximum of three arguments have been given
var currentSession = context.remember();

var lootTable = argv[1]; //get loottable through first argument
var forceReplace = argv[2]; //if to replace targetblock with chest
var coordFile = argv.length > 3 ? (argv[3] + ".json") : 'default.json'; //get the json file name, if no argument present, get default.json
var coordArray = readCoords(coordFile);

if (coordArray)
    changeBaseBlock(coordArray, forceReplace);

//Json reading
function readCoords(_coordFile) {
    var reader = java.nio.file.Files.readAllLines(java.nio.file.Paths.get('config/worldedit/craftscripts/restock/' + _coordFile));
    if (reader)
        return JSON.parse(reader);

    player.print("§4Error: cannot read coordFile (.../config/worldedit/craftscripts/restock/" + _coordFile);
    return false;
}


//Operation
function changeBaseBlock(_coordArray, _forceReplace) {
    /*
    currently the json looks like this:
    [[54, -70, 28, -118],...]
    or
    [[ID, X, Y, Z],...]
    */
    var counter = 0;

    _coordArray = _coordArray[0];

    _coordArray.forEach(coord => {
        var position = new BlockVector(coord[1], coord[2], coord[3]);
        var baseBlock = currentSession.getBlock(position);

        if (baseBlock.id != 54 && !_forceReplace) {
            player.print('§6skipping: ' + position + ' is not a chest: ID:' + baseBlock.id + '.');
            return
        }
        
        if(baseBlock.id != 54 && _forceReplace){
            player.print('§creplacing: ' + position + ' Block: ' + baseBlock.id + ' with Chest!');
            baseBlock = new BaseBlock(54); 
        }

        nbtData = baseBlock.getNbtData();
        nbtLootTable = nbtData.getString('LootTable');

        if (nbtLootTable == lootTable) {
            player.print('§6skipping: ' + position + ' already has desired loottable.');
            return
        }

        //chest has been opened and will therefore be refilled
        /*creating compoundbuilder from existing nbt data*/
        nbtBuilder = nbtData.createBuilder();
        nbtBuilder.putString('LootTable', lootTable);
        baseBlock.setNbtData(nbtBuilder.build());
        currentSession.rawSetBlock(position, baseBlock);
        counter++;
    });
    player.print('§2finished: ' + counter + ' Chests have been filled.')
}

