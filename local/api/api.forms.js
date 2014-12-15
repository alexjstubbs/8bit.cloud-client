/* Form Validation etc.
 * Validation is also Duplicated Server-side. 
 * No need to edit file.
-------------------------------------------------- */

var fs           = require('fs-extra')
,   _validate    = require("validate.js")
, 	_ 			 = require("lodash");

/* Matching
-------------------------------------------------- */
var urlPattern = /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;

/* General Validation Constraints
-------------------------------------------------- */
var constraints = {
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


	if (data.verificationPassword) {
		if (data.password != data.verificationPassword) {
			callback({"email": ['Passwords do not match']});
		}
		else {
			callback();
		}
	}

	else {
		callback(_validate(data, constraints));
	}

}

/* General save Form
-------------------------------------------------- */
var save = function(nsp, data, callback) {
    console.log({cmd: data.formTitle, data: data});
}

/* Exports
-------------------------------------------------- */
exports.validate 	= validate;
exports.save  		= save;