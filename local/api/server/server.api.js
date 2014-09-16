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

    console.log("PATH: "+ path);

    request(path, function (error, response, body) {
        console.log(body) // Print the google web page.
    });

    // var query = {

    //             
                
    //             };

    // request.get({
    //     url: path
    //     // url: path,
    //     // qs: { query: encodeURIComponent(JSON.stringify(query)) }
    // }, function (error, response, body) {
    //         console.log(body) // Print the google web page.
    //     });

    // GET http://localhost/api/v1/Customers?$and=[{"field":">=value"},{"field":[value1,value2]}]

}

exports.getCommunity = getCommunity;