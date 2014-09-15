/* State and RAM reading helper.
-------------------------------------------------- */
var fs = require('fs-extra')
,   Buffer = require('buffer').Buffer
,   constants = require('constants')
,   crc32 = require('buffer-crc32')
,   path = require('path')
    database = require(appDir+'/local/api/database/database.local');


// NES has 2kb of working RAM header. 13kb of state sizes (just under);

// Hex pass must be in format: 0xA8 (NOT 00A8 or 00xA8 etc.)

function checkHex(file, offset, bufflength, addresses, callback) {

    var hexArray = [];

    fs.open(file, 'r', function(status, fd) {

        if (status) {
            console.log(status.message);
            return;
        }

        var buffer = new Buffer(bufflength);
        fs.read(fd, buffer, 0, bufflength, 0, function(err, num) {

            // Check each Hex in Achievement array
            addresses.forEach(function(i) {
               
                var nup = parseInt(i) + parseInt(offset);
                var hex = buffer[nup];
                hex = hex.toString(16);

                if (hex.length < 2) {
                    hex = '0' + hex;
                }

                hex = hex.toUpperCase();
                hexArray.push(hex);
            });

            callback(hexArray);

        });
    });

};

function readHex(req, res, callback) {

    var address = req.params.address;

    /* Offsets are emulator/core specific. 
    -------------------------------------------------- */

    // FCEU
    // var offset = 0x54 
    if (req.params.offset) {
        var offset = req.params.offset;
    } else {
        var offset = 0x54;
    }

    /* Buffer Lengths are system specific.
    -------------------------------------------------- */

    // NES
    // var buflength = 4390;
    if (req.params.bufflength) {
        var bufflength = parseInt(req.params.bufflength);
    } else {
        var bufflength = 4390;
    }

    file = '/Users/alexstubbs/Projects/Samson/Hex/saves/smb.state';

    checkHex(file, offset, bufflength, address, function(hex) {
        res.send(hex);
    });


};


function getCRC32(nsp, filepath) {

    console.log(filepath);

    fs.readFile(filepath, function(err, data) {
        if (data) {
            buffered = crc32(data);
            database.findAchievements({
                CRC32: {
                    $in: [buffered.toString('hex')]
                }
            }, function(data) {
                 nsp.emit('api', {crc32: data});
            })
        } else {
             nsp.emit('api', {crc32: null});
        }
                // res.send(buffered.toString('hex'));
            })
        
}

exports.readHex = readHex;
exports.checkHex = checkHex;
exports.getCRC32 = getCRC32;