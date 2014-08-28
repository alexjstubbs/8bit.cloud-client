/* Misc. Helper Functions
-------------------------------------------------- */


/* Module Definitions
-------------------------------------------------- */

var getFirstChild = function(el) {
    if (el) {
        var firstChild = el.firstChild;
            while (firstChild != null && firstChild.nodeType == 3) { // skip TextNodes
                firstChild = firstChild.nextSibling;
        }
    return firstChild;
    }
   
    else {
        return;
    }
}


var removeBrackets = function(input) {
    return input
    .replace(/\[.*?\]\s?/g, "") // [*]
    .replace(/[\[\]']+/g, "") // []
    .replace(/\{.*?\}\s?/g, "") // {*}
    .replace(/\(.*?\)\s?/g, "") // (*)
    .replace(", The", "") // ', The' alpha
}

/* Exports
-------------------------------------------------- */

exports.getFirstChild = getFirstChild;
exports.removeBrackets = removeBrackets;