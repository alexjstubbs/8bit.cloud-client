/* Writing / Reading filesystem 
-------------------------------------------------- */

var fs   = require('fs-extra')
,   _    = require('lodash');

/* Read JSON files, modify properties/property and re-save file
-------------------------------------------------- */

var writeJSONSync = function(nsp, data, callback) {

    console.log(data);

    var file = appDir+"/config/"+data.filename;

    fs.readJson(file, function(err, object) {
        
        if (!err) {
            
            var merged = _.merge(object, data);
            
            delete merged.formTitle;
            delete merged.filename;

            fs.writeJson(file, merged, function(err) {

                if (err) { console.log("[!] Error writing JSON: "+err) }

                else {
                    console.log("[i] Wrote Data: "+data);
                }

            });

        }
        
        else {

            console.log("[!] Error writing and/or reading JSON file input: " + err);
       
        }

    });

}


/* Exports
-------------------------------------------------- */
exports.writeJSONSync = writeJSONSync;