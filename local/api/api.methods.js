/* Ignition Client API Methods
-------------------------------------------------- */

var api = {
    
    gamesList: function(nsp, param){
        Common.listroms.listRoms(nsp, param);
    },

    platformList: function(nsp){
        Common.listPlatforms.listPlatforms(nsp);
    },

    gameInfo: function(nsp, game) {
        Common.game.gameProfileSmall(nsp, game);
    },

    messages: function(nsp) {
        // console.log("send messages...");
    },

    isOnline: function(nsp, username) {
        Common.network.isOnline(nsp, username);
    },

}

exports.apiMethod = api;