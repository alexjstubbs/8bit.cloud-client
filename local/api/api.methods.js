/* Ignition Client API Methods
-------------------------------------------------- */

var api = {

    gamesList: function(nsp, param){
        common.listroms.listRoms(nsp, param);
    },

    storeGet: function(nsp, database){
        common.databases.storeGet(nsp, database);
    },

    storeData: function(nsp, object){
        common.databases.storeData(object.database, object.values);
    },

    compactDatabase: function(nsp, database){
        common.databases.compactDatabase(database);
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

    deleteMessage: function(nsp, id) {
        common.serverAPI.deleteMessage(nsp, id);
    },

    isOnline: function(nsp, username) {
        common.network.isOnline(nsp, username);
    },

    getFriends: function(nsp) {
        common.serverAPI.getFriends(nsp);
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
    },

    getActivities: function(nsp, set) {
        common.serverAPI.getActivities(nsp);
    },

    newProfile: function(nsp, profile) {
        common.serverAPI.signUp(nsp, profile);
    },

    submitForm: function(nsp, form, data) {
        common.serverAPI.submitForm(nsp, form, data);
    },

    cacheForm: function(nsp, form) {
        common.serverAPI.submitCache(nsp, form);
    },

    getProfile: function(nsp, username) {
        common.serverAPI.getProfile(nsp, username);
    },

    copyFile: function(nsp, copyObject) {
        common.systemWrite.copyFile(nsp, copyObject.src, copyObject.dest);
    },

    writeJSONSync: function(nsp, data) {
        common.systemWrite.writeJSONSync(nsp, data);
    },

    readJSONFile: function(nsp, file) {
        common.systemRead.readJSONFile(nsp, file);
    },

    writeTextSync: function(nsp, data) {
        common.systemWrite.writeJSONSync(nsp, data);
    },

    sysIsOnline: function(nsp) {
        common.network.sysIsOnline(nsp);
    },

    listWifiNetworks: function(nsp) {
        common.wireless.listWifiNetworks(nsp);
    },

    sysGetNetwork: function(nsp) {
        common.network.sysGetNetwork(nsp);
    },

    profileList: function(nsp) {
         common.profiles.listProfiles(nsp);
    },

    profileLogin: function(nsp) {
         common.profiles.profileLogin(nsp);
    },

    getSession: function(nsp) {
         common.profiles.getSession(nsp);
    },

    createSession: function(nsp, obj) {
         common.profiles.createSession(nsp, obj);
    },

    sessionProfile: function(nsp) {
         common.profiles.getSession(nsp);
    },


}

/* Exports
-------------------------------------------------- */
exports.apiMethod = api;
