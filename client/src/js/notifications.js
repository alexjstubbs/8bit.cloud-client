/* jslint node: true */
"use strict";

/*  Notifications
 *  @Invites
 *  @Achievements
-------------------------------------------------- */
var Dialog = require('./dialogs').Dialog;

/**
 * Construct a new invite object
 *
 * @param type  [string] the invite type. e.g. 'game'
 * @param message [string] the possible accompanied message. type. e.g. 'Hey, let's play'
 * @param title [string] the title of the software/game. e.g. 'Star Fox'
 * @param platform [string] the title of the platform for the software. e.g. 'NES'
 * @param software [string] the title of the software e.g. 'RetroArch'
 * @param version [string] the version number of the software e.g. '1.2.4'
 * @param crc32 [string] the CRC32 checksum of the game e.g. 'd123084'
 * @param timestamp [date] the date object of current timestamp e.g. 'Date.now()'
 *
 */

function Invite(type, message, title, platform, software, version, crc32, timestamp) {
    this.type      = type;
    this.message   = message;
    this.title     = title;
    this.platform  = platform;
    this.software  = software;
    this.version   = version;
    this.crc32     = crc32;
    this.timestamp = timestamp;
}

Invite.prototype = {
    accept: function() {
        console.log("accepted", this.timestamp);
    },

    decline: function() {
        console.log("declined", this);
    },

    reply: function() {
        console.log("reply", this);
        // Create new Message object then Message.send method;
    },

    notify: function() {
        console.log("recieved", this);
    },

    display: function() {

        // Inherit props from "MSG" (which come from Serv)

        Dialog        = new Dialog("Dialog");
        Dialog.child  = "Invite";
        Dialog.params = this;

        Dialog.display();
    }
};

/*  Prompts
-------------------------------------------------- */
function Prompt(message, agree, disagree, params) {
    this.message  = message;
    this.agree    = agree;
    this.disagree = disagree;
    this.params   = params;

}

Prompt.prototype = {
    display: function() {
    var dialog           = new Dialog("Prompt");
        dialog.child     = "Prompt";
        dialog.compProps = {message: this.message, agree: this.agree, disagree: this.disagree, parameters: this.params};

        dialog.display();
    }
};

/*  Achievements
-------------------------------------------------- */
function Achievement(message, agree, disagree, params) {
    this.message  = message;
    this.agree    = agree;
    this.disagree = disagree;
    this.params   = params;
}

Achievement.prototype = {
    display: function() {
        Dialog           = new Dialog();
        Dialog.child     = "AchievementUnlocked";
        Dialog.compProps = {message: this.message, agree: this.agree, disagree: this.disagree, parameters: this.params};

        Dialog.display();
    }
};


/*  Exports
-------------------------------------------------- */
exports.Invite      = Invite;
exports.Prompt      = Prompt;
exports.Achievement = Achievement;
