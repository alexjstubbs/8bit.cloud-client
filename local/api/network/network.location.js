/*  Location Information
-------------------------------------------------- */
var request     = require('request')
,   helpers     = require('../../system/system.helpers');

/*  Get local IP and info
-------------------------------------------------- */
function ipInfo(nsp) {

    location = [{ ip: '1.1.1.1' }];
    nsp.emit('api', {ipInfo: location});

}

/*  Get location and info by IP
-------------------------------------------------- */
function ipLocation(nsp, ip) {

    console.log("ip: "+ip);

    if (ip) {

        var path = "http://ipinfo.io/"+ip+"/json"

        request.get({
            uri: path,
            rejectUnauthorized: false
        }, function (error, response, body) {

            if (helpers.isJson(body)) {

                nsp.emit('api', {requestedIpLocation: JSON.parse(body)})

            }
        });
    }
}

/*  Exports
-------------------------------------------------- */
exports.ipInfo      = ipInfo;
exports.ipLocation  = ipLocation;


// http://ipinfo.io/8.8.8.8/json
// https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json
// stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js/3742915#3742915
// http://mapglyphs.com/getting-started
