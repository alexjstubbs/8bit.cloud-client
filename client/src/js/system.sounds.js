/* System Sounds
-------------------------------------------------- */

module.exports = function(){
    return function(sound) {
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST","../sounds/"+sound,true);
        xmlhttp.send();
    };
};
