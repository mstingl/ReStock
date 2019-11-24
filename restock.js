importPackage(Packages.com.sk89q.worldedit); //Setup all the worldedit items
importPackage(Packages.com.sk89q.worldedit.blocks);
importPackage(Packages.com.sk89q.worldedit.world.block);
importPackage(Packages.com.sk89q.jnbt);

context.checkArgs(2, 3, "<namespace/lootTable> <forceReplace> <coordFile>\ncheck https://github.com/Voltane-EU/ReStock.js for Help \n§4Be EXTRA CAREFUL with §6forceReplace §b> §l§4TRUE !! \n§r§4TRIPPLE check that you have the correct coordinates!!"); //ensure atleast two/ maximum of three arguments have been given
var currentSession = context.remember();

var lootTable = argv[1]; //get loottable through first argument
var forceReplace = (argv[2] == 'true'); //if to replace targetblock with chest //convert to bool
var coordFile = argv.length > 3 ? (argv[3] + ".json") : 'default.json'; //get the json file name, if no argument present, get default.json
var coordArray = readCoords(coordFile);

changeBaseBlock(coordArray, forceReplace);


//Json reading
function readCoords(_coordFile) {
    var reader = java.nio.file.Files.readAllLines(java.nio.file.Paths.get('config/worldedit/craftscripts/restock/' + _coordFile));
    if (reader)
        return JSON.parse(reader);
}


//Operation
function changeBaseBlock(_coordArray, _forceReplace) {
    /*
    currently the json looks like this:
    [[54, -70, 28, -118],...]
    or
    [[TARGET, X, Y, Z],...]
    */
    var counter = 0;

    _coordArray = _coordArray[0];
    

    _coordArray.forEach(coord => {


        var position = new BlockVector(coord[1], coord[2], coord[3]);
        var baseBlock = currentSession.getBlock(position);
        var targetContainer = coord[0];


        if (baseBlock.id != targetContainer) {
            if (!_forceReplace) {
                //not a chest, but forcereplace is false, so dont replace
                player.print('§6skipping: '+ baseBlock.id +" | "+ position + ' isnt a chest! forceReplace is '+_forceReplace);
                return
            } else {
                //not a chest, forcereplace is true, so replace'
                player.print('§creplacing: '+ baseBlock.id +" | "+ position + ' with Chest!');
                baseBlock = new BaseBlock(targetContainer);
                nbtBuilder = CompoundTagBuilder.create();
            }
        } else {
            //a chest, dont replace regardless of forcereplace
            nbtData = baseBlock.getNbtData();
            nbtLootTable = nbtData.getString('LootTable');
            if (nbtLootTable == lootTable) {
                player.print('§6skipping: '+ baseBlock.id +" | "+ position + ' already has desired loottable.');
                return
            }
            nbtBuilder = nbtData.createBuilder();
        }

        //chest/container has been opened and will therefore be refilled
        /*creating compoundbuilder from nbt data*/

        nbtBuilder.putString('LootTable', lootTable);
        baseBlock.setNbtData(nbtBuilder.build());
        currentSession.rawSetBlock(position, baseBlock);
        counter++;
    });
    player.print('§2finished: ' + counter + ' Containers have been filled.')
}

