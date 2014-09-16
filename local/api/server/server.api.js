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

var getCommunity = function() {

    var app = "Communities";
    path = "http://" + path.join(server, "api", v, app);

    console.log(path);

    var query = { $or: [
        {URL: 'http://www.racketboy_.com'}] 
    };

    console.log(encodeURIComponent(JSON.stringify(query)));

   request.get({
        uri: path,
        qs: { query: JSON.stringify(query) }
    }, function (error, response, body) {
            console.log(body) // Print the google web page.
    });

    // GET http://localhost/api/v1/Customers?$and=[{"field":">=value"},{"field":[value1,value2]}]

// %257B%2522%2524or%2522%253A%255B%257B%2522URL%2522%253A%2522http%253A%252F%252Fwww.racketboy.com%2522%257D%255D%257D

// %7B%22%24or%22%3A%5B%7B%22URL%22%3A%22http%3A%2F%2Fwww.racketboy.com%22%7D%5D%7D


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