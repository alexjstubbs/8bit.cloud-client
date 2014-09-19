/* Ignition Client API Methods
-------------------------------------------------- */

var api = {
    
    gamesList: function(nsp, param){
        common.listroms.listRoms(nsp, param);
    },
    
    storeGet: function(nsp, database){
        common.databases.storeGet(nsp, database);
    },

    platformList: function(nsp){
        common.listPlatforms.listPlatforms(nsp);
    },

    gameInfo: function(nsp, game) {
        common.game.gameProfileSmall(nsp, game);
    },

    messages: function(nsp) {
        common.serverAPI.getMessages(nsp);
    },

    isOnline: function(nsp, username) {
        common.network.isOnline(nsp, username);
    },

    lookupGame: function(nsp, game) {
        common.game.apicall(nsp, game);
    },

    ipInfo: function(nsp) {
        common.location.ipInfo(nsp);
    },
    
    crc32: function(nsp, path) {
        common.hash.getCRC32(nsp, path);
    },

    community: function(nsp) {
        common.serverAPI.getCommunity(nsp);
    },

    events: function(nsp) {
        common.serverAPI.getEvents(nsp);
    },

    getSet: function(nsp, set) {
        common.getSet.getSet(nsp, set);
    }

}

exports.apiMethod = api;