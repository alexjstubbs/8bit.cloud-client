/* Clientside Database Helpers
-------------------------------------------------- */

var nsp = require('socket.io-client')('/api')
,   PourOver = require('../components/pourover')
,   _ = require("lodash");

var collection;


var filterByAttribute = function(database, query) {

    nsp.emit('request', { request: 'storeGet', param: database });   
    nsp.on('api', function(data){   

    if (data.database) {

        var data = data.database;
         
        if (database == 'games') {
            data = _.flatten(data, 'games');
            data = _.flatten(data, 'game');
        }

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

        console.log(query.length);

        var filtered = filters[0].and(filters[1]);
        var filter_results = collection.get(filtered.cids);

        console.log(filter_results);
    } 

   });
}

exports.filterByAttribute = filterByAttribute;