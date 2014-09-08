/* Misc. Helper Functions
-------------------------------------------------- */

var getFirstChild = require('./helpers.js').getFirstChild;
    removeBrackets = require('./helpers.js').removeBrackets,
    api = require('socket.io-client')('/api'),
    browserNavigation = require('../js/navigation.browser.js').browserNavigation,
    database = require('./database.helpers'),
    events = require('./events'),
    _ = require('lodash');

/* Module Definitions
-------------------------------------------------- */

var browserNavigation = function(k) {

 Podium = {};

    Podium.keydown = function(k) {
        var oEvent = document.createEvent('KeyboardEvent');

        // Chromium Hack
        Object.defineProperty(oEvent, 'keyCode', {
            get: function() {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(oEvent, 'which', {
            get: function() {
                return this.keyCodeVal;
            }
        });

        if (oEvent.initKeyboardEvent) {
            oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, k, k, "", "", false, "");
        } else {
            oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
        }

        oEvent.keyCodeVal = k;

        if (oEvent.keyCode !== k) {
            alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
        }

        document.dispatchEvent(oEvent);

    }

    Podium.keydown(40);
    Podium.keydown(40);

    var td = document.getElementById('list');
    td = getFirstChild(td);
    td = getFirstChild(td);
    td = getFirstChild(td);
    td.classList.add('browser_hovered');


    var b;
    [].forEach.call(
        document.querySelectorAll('[data-tdalpha]'),
        function(el) {
            var a = el.textContent;
            a = a.charAt(1);

            el = el.childNodes[0];

            if (!isNaN(a)) {
                a = "#";
            }

            if (b != a) {
                el.innerHTML = a;
            }

            b = a;

        });

};


/* Browser Navigation Events
-------------------------------------------------- */

var browserNavigationEvents = function(g) {

    var longname = document.querySelectorAll(".platform.selected")[0].getAttribute("data-parameters");

    var game = removeBrackets(g.getAttribute("data-parameters")),
        game = game.replace(/\.[^/.]+$/, "");


    database.filterByAttribute("games", {
        "query": {
            type: "makeExactFilter",
            filter: "title",
            query: game.trim()
        },
        "subquery": {
            type:"makeExactFilter",
            filter: "system",
            query: longname.trim()
        },
    },function(result){
            events.updateGame(result);
        }
    );






    // api.emit('request', { request: 'gameInfo', param: game });


//     console.log(g);

//        getInfo(g);

// /* Display Game
// -------------------------------------------------- */

//     function displayGame(obj, selected) {


//         var elt = document.getElementsByClassName("selectedNav")[0];

//         var ref = elt.getAttribute("data-snav");
//         var refAttr = document.querySelectorAll("[data-ref]");

//         var recent = refAttr[ref].innerHTML;

//         recent = removeBrackets(recent);
//         recent = recent.trim();
//         selected = selected.trim();

//         if (recent != selected) {
//             return
//         }

//         if (obj) {

//             if (obj.box_front.length) {
//                 var domain = obj.box_front;
//                 var game_image_sorted = obj.box_front;
//                 domain = domain.split('/');

//                 if (domain[2] == 'image.com.com') {
//                     var url_ = "http://image.gamespotcdn.net/gamespot/" + domain.slice(-4).join('/');
//                     var el = document.getElementsByClassName("game_image")[0];
//                     el.innerHTML = "<img src='" + url_ + "' class='img-rounded img-responsive'>";
//                     game_image_sorted = url_;

//                 } else {
//                     var el = document.getElementsByClassName("game_image")[0];
//                     el.innerHTML = "<img src='" + obj.box_front + "' class='img-rounded img-responsive'>";
//                 }

//             } else {
//                 var el = document.getElementsByClassName("game_image")[0];
//                 el.innerHTML = "<h1><i class='icon ion-filing'></i></h1>";
//             }



//             if (obj.genre) {
//                 var el = document.getElementsByClassName("game_genre")[0];
//                 el.innerHTML = obj.genre;
//             }
//             if (obj.description) {

//                 var el = document.getElementsByClassName("game_deck")[0];
//                 if (obj.description.length) {
//                     el.innerHTML = obj.description.split(" ").splice(0, 100).join(" ").concat(" [...]");
//                 }
//             } else {
//                 var el = document.getElementsByClassName("info_list_name")[0];
//                 el.innerHTML = "Game Description"
//             }
//             // document.body.style.backgroundImage="url('http://s3.amazonaws.com/data.archive.vg/images/games/4791/z9ttl_1080p.jpg')";

//             // obj.id

//         } else {


//         }

//         document.getElementById("working_params").innerHTML = JSON.stringify(obj);
//         // console.log(obj);

//         document.querySelectorAll(".game_name")[0].innerHTML = selected;
//     }


//     /* Get Info
// -------------------------------------------------- */

//     function getInfo(game) {

        
//         var handleResponse = function(status, response) {


//             // Get Shortname of System 
//             var sysorder = document.querySelectorAll(".platform.selected")[0].getAttribute("data-order");
//             var platforms = document.getElementById("shortnames").innerHTML;
//             platforms = JSON.parse(platforms);

//             var system = platforms[sysorder];

//             if (response.indexOf("game") != -1) {
//                 var obj = JSON.parse(response);
//                 if (obj) {
//                     var results_length = obj.games.game.length;

//                     // Multiple Results
//                     if (results_length != null) {

//                         // displayGame(obj.games.game[0], game)

//                         for (var i = 0; i < results_length; i++) {

//                             // Give Specific Platform Priority if possible
//                             if (obj.games.game[i].system != system && i != results_length - 1) {
//                                 delete obj.games.game[i];
//                             } else {
//                                 displayGame(obj.games.game[i], game)
//                                 break;
//                             }

//                         }
//                     }

//                     // Single Result
//                     else {
//                         displayGame(obj.games.game, game)
//                     }
//                 }

//                 // No Results
//                 else {
//                     displayGame(null, game);
//                 }

//             } else {
//                 displayGame(null, game);
//             }

//         }

//         var handleStateChange = function() {
//             switch (xmlhttp.readyState) {
//                 case 0: // UNINITIALIZED
//                 case 1: // LOADING
//                 case 2: // LOADED
//                 case 3: // INTERACTIVE
//                     break;
//                 case 4: // COMPLETED
//                     handleResponse(xmlhttp.status, xmlhttp.responseText);
//                     break;
//                 default:
//                     console.log("error")
//             }
//         }

//         // game = game.replace(/ /g, '+');

//         url = "../game/profile/small/" + game;
//         var xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = handleStateChange;
//         xmlhttp.open("POST", url, true);
//         xmlhttp.send(null);
//     }

//     return function selectedGame(el) {

//         var p = document.getElementById('platforms').innerHTML;
//         console.log(p);
//         p = JSON.parse(p);

//         var ref = el.getAttribute("data-snav");
//         var refAttr = document.querySelectorAll("[data-ref]");

//         var offSelect = -36;
//         var alphalist = document.getElementById("alpha_list");

//         alphalist.scrollTop = 0;

//         offSelect = offSelect + 36;
//         alphalist.scrollTop = offSelect;

//         var g = refAttr[ref].innerHTML;

//         var num = g.charAt(0);
//         if (!isNaN(num)) {
//             num = "#";
//         }

//         // Add Alpha List Active
//         [].forEach.call(
//             document.querySelectorAll('[data-alpha]'),
//             function(el) {
//                 if (el.attributes[0].nodeValue == num) {
//                     el.classList.add('active')
//                 } else {
//                     el.classList.remove('active');
//                 }
//             }
//         );

//         g = g.replace(/\[.*\]/, '');
//         g = g.replace(/\(.*\)/, '');

//         var elements = document.getElementsByClassName('nameOfClassHere');

//         var emptyDiv = document.querySelectorAll("span.game_image, span.game_genre, span.game_genre, span.game_deck, span.game_ersb");
//         emptyDiv.innerHTML = "";
//         // $("span.game_image, span.game_genre, span.game_genre, span.game_deck, span.game_ersb").html("");

//         var workingDiv = document.querySelectorAll('span.game_image').innerHTM = "<i class='icon purple ion-loading-c' style='font-size:5em;padding:10px'></i>";
//         // $("span.game_image").html("<i class='icon purple ion-loading-c' style='font-size:5em;padding:10px'></i>");

//         workingDiv = document.querySelectorAll('span.game_name').innerHTML = g;
//         // $("span.game_name").html(g);
//         workingDiv = document.querySelectorAll('.info_list_name h4').innerHTML = '';
//         // $(".info_list_name h4").html("");

//         // Construct Initial Launch Parameters
//         var launchParms = new Object();

//         launchParms.base = "retroarch";
//         launchParms.paramaters = "L";
//         launchParms.system = document.querySelectorAll('li.selected')[0].firstChild.nodeValue;
//         launchParms.emulator = document.querySelectorAll('li.selected')[0].attributes[5].nodeValue;
//         launchParms.rom = document.querySelectorAll('.selectedNav')[0].childNodes[0].childNodes[1].attributes[2].nodeValue;

//         launchParms.pack = p;


//         var rompath = "/home/pi/roms/" + launchParms.pack[launchParms.system].short + "/" + launchParms.rom + "";

//         workingDiv = document.querySelector('#alpha_list').setAttribute('data-parameters', JSON.stringify(launchParms));

//         // $("#alpha_list").attr("data-parameters", JSON.stringify(launchParms));

//         console.log(launchParms.rom);
//         // Achievement Lookup

//         var handleResponse = function(status, response) {
//             if (status == 200) {
//                 var achievement_display = document.getElementById("achievement_display");
//                 if (response) {
//                     achievement_display.classList.remove("hidden");
//                 } else {
//                     achievement_display.classList.add("hidden");
//                 }
//             } else {
//                 return;
//             }
//         };

//         var handleStateChange = function() {
//             switch (xmlhttp.readyState) {
//                 case 0: // UNINITIALIZED
//                 case 1: // LOADING
//                 case 2: // LOADED
//                 case 3: // INTERACTIVE
//                     break;
//                 case 4: // COMPLETED
//                     handleResponse(xmlhttp.status, xmlhttp.responseText);
//                     break;
//                 default:
//                     console.log("error")
//             }
//         }

//         var xmlhttp = new XMLHttpRequest();
//         xmlhttp.open("POST", "http://localhost:1210/hash", true);
//         xmlhttp.onreadystatechange = handleStateChange;
//         xmlhttp.send(rompath);


     
//     }

};

/* Exports
-------------------------------------------------- */

exports.browserNavigation = browserNavigation;
exports.browserNavigationEvents = browserNavigationEvents;