/* Clientside Database Helpers
-------------------------------------------------- */

var nsp = require('socket.io-client')('/api')
,   PourOver = require('../components/pourover')
,   _ = require("lodash")
,   nedb = require("../../../node_modules/nedb/browser-version/out/nedb.min");

var collection = {},
    filters = {};

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


var initLocalDatabase = function(database, callback) {
    nsp.emit('request', { request: 'storeGet', param: database });   
    nsp.on('api', function(data){   
        if (data.database) {


            if (database == "games") {
                    data = _.flatten(data.database, 'games'),
                    data = _.flatten(data, 'game');
            }
            

            collection[database] = new PourOver.PourOver.Collection(data);

            console.log(collection[database]);
        }
    });
    return;
}

var filterByAttribute = function(database, query, callback) {

    if (collection[database]) {


        var filter = [];

        _(query).forEach(function(_query) {
            if (_query['type']) {
                var hash = JSON.stringify(_query).hashCode();
                filters[hash] = PourOver.PourOver.makeExactFilter(_query['filter'], [_query['query']]);
                collection[database].addFilters(filters[hash]);
                var results = collection[database].filters[_query['filter']].getFn(_query['query']);
                filter.push(results);
            }
        });

        console.log(filter);

        if (filter.length > 1) {
            var filtered = filter[0].and(filter[1]);
            var filter_results = collection[database].get(filtered.cids);
        }

        else {
            var filtered = filter[0];
            var filter_results = collection[database].get(filtered.cids);
            console.log(filter_results);
        }

        callback(filter_results);


  // var unique_filter = PourOver.PourOver.makeExactFilter(_query['filter'], [_query['query']]);  
  //               collection.addFilters(unique_filter); 
  //               var results = collection.filters[_query['filter']].getFn(_query['query']);
  //               filters.push(results);



  //       var filtered = filters[0].and(filters[1]);
  //       var filter_results = collection.get(filtered.cids);

  //       callback(filter_results);
    } 

    else {
        initLocalDatabase(database, function() {
            filterByAttribute(database, query, callback);
        })
    }

}

exports.filterByAttribute = filterByAttribute;
exports.initLocalDatabase = initLocalDatabase;