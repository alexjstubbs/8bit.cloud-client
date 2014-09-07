/* Clientside Database Helpers
-------------------------------------------------- */

var nsp = require('socket.io-client')('/api')
,   PourOver = require('../components/pourover')
,   _ = require("lodash")
,   nedb = require("../../../node_modules/nedb/browser-version/out/nedb.min");

var collection,
    db;

var initLocalDatabase = function(database) {
    nsp.emit('request', { request: 'storeGet', param: database });   
    nsp.on('api', function(data){   
        if (data.database) {
             db = new nedb({
                autoload: true,
                filename: database
             }); 
             db.insert(data.database);
        }
    });
}

var filterByAttribute = function(database, query, callback) {

    var items = localStorage.getItem(database);

    items = JSON.stringify(items);
    console.log(JSON.parse(items));

    // console.log(items);

    if (items) {

        var data = items;
         
        // if (database == 'games') {
        //     data = _.flatten(data, 'games');
        //     data = _.flatten(data, 'game');
        // }

        // console.log(data);

        collection = new PourOver.PourOver.Collection(data);
            
        filters = [];

        _(query).forEach(function(_query) {
            if (_query['type']) {
                var unique_filter = PourOver.PourOver.makeExactFilter(_query['filter'], [_query['query']]);  
                collection.addFilters(unique_filter); 
                var results = collection.filters[_query['filter']].getFn(_query['query']);
                filters.push(results);
            }
        });

        var filtered = filters[0].and(filters[1]);
        var filter_results = collection.get(filtered.cids);

        callback(filter_results);
    } 

}

exports.filterByAttribute = filterByAttribute;
exports.initLocalDatabase = initLocalDatabase;