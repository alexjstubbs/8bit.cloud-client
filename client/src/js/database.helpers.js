/* Clientside Database Helpers
-------------------------------------------------- */

var nsp = require('socket.io-client')('/api')
,   PourOver = require('../components/pourover')
,   _ = require("lodash");

var collection;


var filterByAttribute = function(database, filter, op) {

    nsp.emit('request', { request: 'storeGet', param: database });   
    nsp.on('api', function(data){   

    if (data.database) {

        var data = data.database;
         
        if (database == 'games') {
            data = _.flatten(data, 'games');
            data = _.flatten(data, 'game');
        }
   
        collection = new PourOver.PourOver.Collection(data);

        var unique_filter = PourOver.PourOver.makeExactFilter(filter, op);

        collection.addFilters(unique_filter);

        var str = "collection.filters."+filter+".getFn(op)";
        var results = eval(str);

        var _results = collection.get(results.cids);

        console.log(_results);
    
    } 

   });

        // if (database == 'games') {
        //     db = _.flatten(data.database, 'games');
        //     flat = _.flatten(flat, 'game');
        // }

        // collection = new PourOver.PourOver.Collection(flat);

        // var system_filter = PourOver.PourOver.makeExactFilter("developer", ["Konami"]);

        // collection.addFilters(system_filter);

        // var konami = collection.filters.developer.getFn("Konami");

        // var _konami = collection.get(konami.cids);

        // console.log(_konami)


}

exports.filterByAttribute = filterByAttribute;