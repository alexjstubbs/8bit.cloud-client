/* Form Validation etc.
 * Validation is also Duplicated Server-side.
 * No need to edit file.
-------------------------------------------------- */

var _validate      = require("validate.js")
,   _              = require("lodash");

/* Matching
-------------------------------------------------- */
var urlPattern = /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;


/*  addFriend Validation Contraints
-------------------------------------------------- */
var addFriend_constraints = {

    formTitle: {
        presence: true
    },
    username: {
        presence: true
    }

}

/* signUp Validation Constraints
-------------------------------------------------- */
var signUp_constraints = {

    formTitle: {
        presence: true
    },

    email: {
        presence: true,
            email: {
          message: "doesn't look like a valid email"
        }
    },

    username: {
        presence: true
    },

    password: {
        presence: true,
            length: {
                  minimum: 6,
                  message: "must be at least 6 characters"
        }
    },
    avatar: {
        format: {
            pattern: urlPattern,
            message: "URL is invalid or malformed"
        }
    }
};


/* General Validation
-------------------------------------------------- */
var validate = function(data, callback) {

    switch (data.formTitle) {

        // Sign Up
        case "signUp": {

            if (data.verificationPassword) {
                if (data.password != data.verificationPassword) {
                    callback({"email": ['Passwords do not match']});
                }
                else {
                    callback();
                }
            }

            else {
                callback(_validate(data, signUp_constraints));
            }

        break;

        }

        // Add A Friend
        case "addFriend": {
            callback(_validate(data, addFriend_constraints));
            break;
        }

        case "passMessage": {
            callback();
        }
    }

}

/* General save Form
-------------------------------------------------- */
var save = function(nsp, data, callback) {
    console.log({cmd: data.formTitle, data: data});
}

/* Exports
-------------------------------------------------- */
exports.validate     = validate;
exports.save         = save;
