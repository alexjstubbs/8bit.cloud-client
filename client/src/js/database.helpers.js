/* Clientside Database Helpers
-------------------------------------------------- */

var nsp         = require('socket.io-client')('/api'),
    _           = require("lodash"),
    api         = require('socket.io-client')('/api');

/* Scoped Module Globals
-------------------------------------------------- */
var collection = {},
    filters = {};

/* Hash code prototype (move to module)
-------------------------------------------------- */
String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

/* Initialize the local Database
 * TODO: Speed Improvements.
-------------------------------------------------- */
var initLocalDatabase = function(database, callback) {
    return;
};

/* Filter Collection by Attribute
-------------------------------------------------- */
var filterByAttribute = function(database, query, callback) {


    var obj = {};

    var title = query.query.query;

    api.emit('request', { request: 'lookupGame', param: title });

    obj = [{
        title: title,
        system: query.subquery.query,
        description: title+" the videogame"
    }];

    callback(obj);

};

/* Exports
-------------------------------------------------- */
exports.filterByAttribute = filterByAttribute;
exports.initLocalDatabase = initLocalDatabase;
