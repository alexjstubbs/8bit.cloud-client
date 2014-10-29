/* Misc. Helpers
-------------------------------------------------- */

// Simple valid JSON check
var isJson = function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/* Exports
-------------------------------------------------- */
exports.isJson = isJson;