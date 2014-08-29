/* List Roms by System
-------------------------------------------------- */
var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var platforms = require(appDir+'/config/platforms.json'),
    config = require(appDir+'/config/config.json');

function listRoms(nsp, platform) {

        var listObj = [],
            list;

        var initDir = process.env['HOME'] + config.roms + platforms[platform].short;

        fs.readdir(initDir, function(err, list) {
            if (err) {
                console.log(err)
            } else {

                _(list).forEach(function(filename) { 

                    listObj.push(
                        {"filename":filename,"ext":".nes","title":filename,"CRC32":"D445F698","achievements":{"CRC32":["D445F698","3337ec46","3448e736"],"SHA1":["FACEE9C577A5262DBE33AC4930BB0B58C8C037F7","ea343f4e445a9050d4b4fbac2c77d0693b1d0922"],"strict":false,"Hello World":{"description":"Get a Mushroom","address":"0x754","operator":"==","operand":"00","unique":"smb_getamushroom","count":true,"single":true},"Goodbye World":{"description":"Die once (test)","address":"0x000E","operator":"==","operand":"0B","unique":"smb_die","count":true,"single":true},"Crouching":{"description":"Crouch (test)","address":"0x06D5 ","operator":"==","operand":"50","unique":"smb_crouch","count":true,"single":true}}}
                    )
                        });

                 nsp.emit('api', {gamesList: listObj});
                
            }
        });


}

exports.listRoms = listRoms;
