
/* List Roms by System
-------------------------------------------------- */
var fs = require('fs'),
    _ = require('lodash');


function ipInfo(nsp) {

    location = [{ ip: '1.1.1.1' }];

    nsp.emit('api', {ipInfo: location});       
           
}

exports.ipInfo = ipInfo;


// http://ipinfo.io/8.8.8.8/json
// https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json
// stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js/3742915#3742915
// http://mapglyphs.com/getting-started