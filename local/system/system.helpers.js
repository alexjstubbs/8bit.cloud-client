/*  Misc. Helper Functions
-------------------------------------------------- */

/* Check for valid JSON return
-------------------------------------------------- */
function isJSON(data) {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
}

/* Check For Sequels etc.
-------------------------------------------------- */
function hasNumbers(string) {
    var regex = /\d/g;
    return regex.test(string);
}

/* Cap For DB Store etc.
-------------------------------------------------- */
function toCap(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


/*  Exports
-------------------------------------------------- */
exports.isJSON      = isJSON;
exports.hasNumbers  = hasNumbers;
exports.toCap       = toCap;
