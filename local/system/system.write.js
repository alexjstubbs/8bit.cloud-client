/* Writing / Reading filesystem 
-------------------------------------------------- */

var fs   = require('fs-extra')
,   _    = require('lodash');

/* Copy a file
-------------------------------------------------- */
var copyFile = function(nsp, src, dest, callback) {

    fs.copy(src, dest, function(err) {

        if (err) {
            
            nsp.emit('messaging', {type: 0, body: err });

            if (callback || typeof callback == "function") {
                callback(err, null);
            }

        }

        else {

             if (callback || typeof callback == "function") {
                callback(null, true);
            }

        }

    }) 

};


/* Read JSON files, modify properties/property and re-save file
-------------------------------------------------- */

var writeJSONSync = function(nsp, data, callback) {

    if (data.path) {
   
        var file = appDir + data.path + "/" + data.filename;
   
    }

    else {

         var file = data.filename;
   
    }

    fs.readJson(file, function(err, object) {

        if (err) {

            if (callback || typeof callback == "function") {
                callback(err, null);
            }

        }

        else {
            
            var merged = _.merge(object, data);
            
            delete merged.formTitle;
            delete merged.path;
            delete merged.filename;

            fs.outputJson(file, merged, function(err) {

                if (err) { 
                
                    if (callback || typeof callback == "function") {
                        callback(err, null);
                    }
                
                }

                else {

                    console.log("[i] Wrote Data: " + data);

                    if (callback || typeof callback == "function") {
                        callback(null, data);
                    }

                }

            });

        }
        
    });

}

/* Write/Overwrite a new json File
-------------------------------------------------- */

var writeJSON = function(nsp, data, callback) {

    if (data.path) {
   
        var file = appDir + data.path + "/" + data.filename;
   
    }

    else {

         var file = data.filename;
   
    }

    delete data.filename;
    delete data.formTitle;
    delete data.path;

    fs.outputJson(file, data, function(err) {


        if (err) { 
        
            if (callback || typeof callback == "function") {
                callback(err, null);
            }
        
        }

        else {

                console.log("[i] Wrote Data: " + data);

                if (callback || typeof callback == "function") {
                    callback(null, data);
                }

            }

    });

}
        


/* Write Text file
-------------------------------------------------- */
var writeTextSync = function(nsp, data, callback) {
    
}

/* Exports
-------------------------------------------------- */
exports.writeJSONSync   = writeJSONSync;
exports.writeJSON       = writeJSON;
exports.writeTextync    = writeTextSync;
exports.copyFile        = copyFile;