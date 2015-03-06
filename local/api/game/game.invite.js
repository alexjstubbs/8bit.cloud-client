/* Invite System
-------------------------------------------------- */
var server  = require(__base + 'api/server/server.api'),
    sysRead = require(__base + 'system/system.read');

/* Accept Invite
-------------------------------------------------- */
var acceptInvite = function(nsp, json) {

    var payload = JSON.parse(json);

    sysRead.readDirCRC(payload.invite.platform, payload.invite.crc32, function(err, result) {

        if (!err) {
            console.log(result);
        }

        else {
            console.log(err);
        }

    });

    // payload.invite.platform
    // payload.invite.crc32

    // "gameTitle":"Advanced Dungeons & Dragons - Heroes of the Lance","platform":"nes","software":"RetroArch","version":null,"md5":null,"crc32":"e880d426"}" client.build.js:10810:8


};

/* Exports
-------------------------------------------------- */
exports.acceptInvite = acceptInvite;
