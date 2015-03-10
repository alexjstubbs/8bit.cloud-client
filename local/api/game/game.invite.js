/* Invite System
-------------------------------------------------- */
var server  = require(__base + 'api/server/server.api'),
    sysRead = require(__base + 'system/system.read'),
    game    = require(__base + 'api/game/game.helpers');

/* Accept Invite
-------------------------------------------------- */
var acceptInvite = function(nsp, json) {

    var payload = JSON.parse(json);

    sysRead.readDirCRC(payload.invite.platform, payload.invite.crc32, function(err, result) {

        if (!err && result) {
            game.multiplayerPrep(nsp, json, result);
        }

        else if (err) {
            nsp.emit('messaging', {type: 0, body: err });
        }

        else if (!err && !result) {
            nsp.emit('messaging', {type: 0, body: "No compatable ROMs found on your system. Please check version and checksum. CRC32 checksum needed for ROM: " + payload.invite.crc32 });
        }

    });

};

/* Exports
-------------------------------------------------- */
exports.acceptInvite = acceptInvite;
