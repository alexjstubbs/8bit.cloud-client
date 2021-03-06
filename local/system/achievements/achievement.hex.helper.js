/* State and RAM reading helper.
-------------------------------------------------- */
var fs          = require('fs-extra'),
    Buffer      = require('buffer').Buffer,
    crc         = require('crc'),
    database    = require(__base + 'api/database/database.local');

// Hex pass must be in format: 0xA8 (NOT 00A8 or 00xA8 etc.)
function checkHex(stdin, offset, bufflength, addresses, callback) {

    var hexArray = [];
        buffer   = stdin;

        // console.log(addresses);

        // Check each Hex in Achievement array
        addresses.forEach(function(i) {

            // console.log("i: "+i);
            // console.log("offset: "+offset);

            var nup = parseInt(i) + parseInt(offset);


            // console.log("nup: "+nup);

            var hex = buffer[nup]; // sometimes null on gen

            if (!hex) {
                // console.log(nup);
                // console.log(buffer[nup]);
            }

            if (hex) { hex = hex.toString(16); }
                else { hex = 0; }

            if (hex.length < 2) {
                hex = '0' + hex;
            }

            hex = parseInt(hex);
            hexArray.push(hex);

        });

        callback(hexArray);

}

/*  Read hex via post (debug)
-------------------------------------------------- */
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


}

/*  Get CRC32 Value of FILEPATH and match in Achievement DB
-------------------------------------------------- */
function getCRC32(nsp, filepath, callback) {

    var buffered;

    if (filepath) {

        fs.readFile(filepath, function(err, data) {

            if (data) {
                buffered = crc.crc32(data).toString(16);

                database.findAchievements({CRC32: { $in: [buffered.toString('hex')] }}, function(data) {
                if (buffered) {
                    if (data) {
                        if (nsp) nsp.emit('api', {crc32: data});
                        if (nsp) nsp.emit('api', {crc32hash: buffered});

                        if (callback) callback({crc32: data});
                    }

                    else {
                        if (nsp) nsp.emit('api', {crc32: "null"});
                        if (nsp) nsp.emit('api', {crc32hash: buffered});

                        if (callback) callback({crc32: "null"});
                    }
                }});
            }

            else {
                if (nsp) nsp.emit('api', {crc32: "null"});
                if (nsp) nsp.emit('api', {crc32hash: buffered});

                if (callback) callback({crc32: "null"});
            }

        });
    }

}

/*  Exports
-------------------------------------------------- */
exports.readHex     = readHex;
exports.checkHex    = checkHex;
exports.getCRC32    = getCRC32;
