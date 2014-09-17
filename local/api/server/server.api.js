/* Ignition Server API
-------------------------------------------------- */
var fs = require('fs-extra')
,   path = require('path')
,   request = require('request');

/* Set up (use config file)
-------------------------------------------------- */
var server = "localhost:3000"
,   port = 3000
,   v = "v1"
,   api = path.join(server, "api", v);

/* Community Endpoint
-------------------------------------------------- */

var getCommunity = function(nsp) {

    var app = "Communities";
    _path = "http://" + path.join(server, "api", v, app);

    // var query = { $or: [
    //     {URL: 'http://www.racketboy.com'}] 
    // };

   request.get({
        uri: _path
        // qs: { query: JSON.stringify(query) }
    }, function (error, response, body) {
            console.log(body);
            nsp.emit('api', {community: JSON.parse(body)}) // Emit this to update the community events
    });

}

exports.getCommunity = getCommunity;

 // $or: [
 //                {name: '~Another'},
 //                {$and: [
 //                    {name: '~Product'},
 //                    {price: '<=10'}
 //                ]}
 //            ],
 //                price: 20
 //            };