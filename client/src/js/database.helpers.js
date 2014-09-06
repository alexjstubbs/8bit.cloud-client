/* Clientside Database Helpers
-------------------------------------------------- */

var nsp = require('socket.io-client')('/api')
,   PourOver = require('../components/pourover')
,   Nedb = require('../../../node_modules/nedb/browser-version/out/nedb.min.js')
,   _ = require("lodash");

var collection;

var storeDatabase = function(database) {
    nsp.emit('request', { request: 'storeGet', param: database });   
        nsp.on('api', function(data){   
            if (data.database) {

                var db = new Nedb({
                    filename: "games"
                });

                var flat = _.flatten(data.database, 'games');
                flat = _.flatten(flat, 'game');

                collection = new PourOver.PourOver.Collection(flat);
                
                var system_filter = PourOver.PourOver.makeExactFilter("developer", ["Konami"]);

                collection.addFilters(system_filter);

                var konami = collection.filters.developer.getFn("Konami");

                var _konami = collection.get(konami.cids);

                console.log(_konami)

            }
        });
}

var filterBySystem = function(system, _collection) {
 
}

exports.storeDatabase = storeDatabase;