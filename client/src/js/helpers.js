/* Misc. Helper Functions
-------------------------------------------------- */

/* Get first child of element (minus textnodetype)
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

/* Remove general brackets and characters from filenames
-------------------------------------------------- */
var removeBrackets = function(input) {
    var re = /(?:\.([^.]+))?$/;
    return input.replace(/\[.*?\]\s?/g, "") // [*]
    .replace(/[\[\]']+/g, "") // []
    .replace(/\{.*?\}\s?/g, "") // {*}
    .replace(/\(.*?\)\s?/g, "") // (*)
    .replace(", The", "") // ', The' alpha
    .replace(re, '');
}

/* Preload images
-------------------------------------------------- */
var preloadImage = function(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        callback(true)        
    };
}

/* Exports
-------------------------------------------------- */
exports.getFirstChild = getFirstChild;
exports.removeBrackets = removeBrackets;
exports.preloadImage = preloadImage;