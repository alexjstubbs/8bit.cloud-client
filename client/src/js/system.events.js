/* Requested system events via client
-------------------------------------------------- */

// TODO: Split into files/modules

var systemNotify = require('./notification.init.js'),
    mousetrap = require('./mousetrap.min.js'),
    api = require('socket.io-client')('/api'),
    React = require('react/addons'),
    Modal = require('../interface/Modal.jsx'),
    Messages = require('../interface/Messages.jsx');

    // browser = require("./browser.js");

module.exports = function(event, p) {

        function removeBrackets(input) {
            return input
                .replace(/\[.*?\]\s?/g, "") // [*]
            .replace(/[\[\]']+/g, "") // []
            .replace(/\{.*?\}\s?/g, "") // {*}
            .replace(/\(.*?\)\s?/g, "") // (*)
            .replace(", The", "") // ', The' alpha
        }

        // Message 


        if (event == 'viewFriends') {
            var title = "Uh Oh!"
            var message = "4";
            var height = 60;
            var width = 70;
            var left = 15;
            systemNotify('/systemNotification/' + title + '/' + message, height, width, left);
        }

        if (event == 'demoMsg') {

            var title = "Uh Oh!"
            var message = "2";
            var height = 62;
            systemNotify('/systemNotification/' + title + '/' + message, height);

            if (p) {


                var allBacks = document.querySelectorAll(".systemNotificationContentBackdrop");
                var allConts = document.querySelectorAll(".systemNotificationContent");

                document.body.removeChild(allConts[0]);
                document.body.removeChild(allBacks[0]);
                // document.body.removeChild(content);

            }


        }

        if (event == 'community') {
            var title = "Uh Oh!";
            var message = "5";
            var height = 85;
            var width = 45;
            var left = 25;
            var top = 5;
            systemNotify('/systemNotification/' + title + '/' + message, height, width, left, top);
        }


        if (event == 'demoGame') {
            var title = "Uh Oh!"
            var message = "3";
            var height = 65;
            var width = 65;
            var left = 17;
            systemNotify('/systemNotification/' + title + '/' + message, height, width, left);
        }

        // Close Lightboxes
        if (event == 'closeLightbox') {

            var backdrop = document.getElementById('backdrop');
            var content = document.getElementById('lightbox');

            content.className = "systemNotificationContent animated bounceOutDown";
            backdrop.className = "systemNotificationContentBackdrop animated fadeOut";


            setTimeout(function(e) {
                document.body.removeChild(content);
                document.body.removeChild(backdrop);
            }, 2000);

            var currentSelection = document.querySelectorAll(".navable");

            currentSelection[0].classList.add("selectedNav");
            // navigationBrowse(currentSelection[0]);

            if (p) {
                var allBacks = document.querySelectorAll(".systemNotificationContentBackdrop");
                var allConts = document.querySelectorAll(".systemNotificationContent");

                document.body.removeChild(allConts[0]);
                document.body.removeChild(allBacks[0]);
                // document.body.removeChild(content);

            }

        }
        // Large Profile Page
        if (event == 'largeProfile') {


            var workingPack = document.querySelector('#alpha_list').getAttribute('data-parameters');

            var httpRequest = new XMLHttpRequest();
            httpRequest.open("GET", "../includes/screens.json", false);
            httpRequest.send()

            document.getElementById('content_load').style.display = 'none'

            var url = "http://localhost:1210/game/profile/large/" + p;

            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data) {

                {
                    if (httpRequest.readyState == 4 && httpRequest.status == 200) {

                        var fragment = document.createDocumentFragment();

                        var s = fragment.appendChild(document.createElement('div'));
                        s.setAttribute("data-package", workingPack);
                        s.innerHTML = httpRequest.responseText;
                        fragment.appendChild(s);

                        var recentObj = document.getElementById("working_params").innerHTML;

                        var objParsed = JSON.stringify(recentObj);
                        objParsed = JSON.parse(objParsed);

                        document.body.innerHTML = "";
                        document.getElementsByTagName('body').item(0).appendChild(fragment);

                        document.getElementById('profile-gametitle').innerHTML = removeBrackets(p).replace(/\.[^/.]+$/, "");
                        document.getElementById('play-game').setAttribute("data-parameters", workingPack);


                    }
                }

            }

            httpRequest.open('GET', url);
            httpRequest.send();


            document.getElementById('content_load').style.display = ''



        }

        if (event == 'switchEmulator') {

            var list = document.querySelectorAll(".platform");

            for (var i = 0; i < list.length; i++) {
                list[i].classList.remove("selected");
            }

            console.log(list);

            // var platform = list[p].innerHTML;

            // var handleResponse = function(status, list) {
            //     // list = JSON.stringify(list);
            //     var gamesList = document.getElementById('gameList');
            //     gamesList.innerHTML = list;

            //     // SWITCH EMU CHECK
            //     // browser(list);

            // }

            // var handleStateChange = function() {
            //     switch (xmlhttpl.readyState) {
            //         case 0: // UNINITIALIZED
            //         case 1: // LOADING
            //         case 2: // LOADED
            //         case 3: // INTERACTIVE
            //             break;
            //         case 4: // COMPLETED
            //             handleResponse(xmlhttpl.status, xmlhttpl.responseText);
            //             break;
            //         default:
            //             console.log("error");
            //     }
            // }

            // urllaunch = "http://localhost:1210/list";
            // var xmlhttpl = new XMLHttpRequest();
            // xmlhttpl.onreadystatechange = handleStateChange;
            // xmlhttpl.open("POST", urllaunch, true);
            // xmlhttpl.send(platform);

        }

        // Panel Sub Navigation
        if (event == 'highlightPanel') {

            Mousetrap.trigger('down');

        }


        if (event == 'viewMessages') {
            
            React.renderComponent(Modal({children: Messages(null)}), document.getElementById("appendices"));

           
            // var title = "Uh Oh!"
            // var message = "1";
            // var height = 0
            // systemNotify('/systemNotification/' + title + '/' + message, height);
        }

        if (event == 'largeProfile') {

            // Turn this into document fragment and clone small profile as starting point

            // var alist = document.getElementById("alpha_list");
            // var smallp = document.getElementById("small_profile");
            // var smallp_header = document.getElementById("profile_header");
            // document.getElementById("browser_pagination").classList.toggle("hidden");
            // document.getElementById("heading").classList.toggle("hidden");

            // alist.classList.toggle('hidden');

            // smallp.classList.toggle('col-md-8');
            // smallp.classList.toggle('col-md-12');
            // smallp.classList.toggle('break_up');
            // smallp.classList.toggle('selectedNav');

            // smallp_header.classList.toggle('hidden');
        }

        if (event == 'launchGame') {
            p = JSON.parse(p);

            console.dir(p);
            var path = p.pack[p.system].emulators[p.emulator].path;


            var payload = p.base + " " + p.paramaters + " " + path + " \"/home/pi/roms/" + p.pack[p.system].short + "/" + p.rom + "\"";


            // REST API

            var handleResponse = function(status, response) {
                console.log(response)
            }

            var handleStateChange = function() {
                switch (xmlhttpl.readyState) {
                    case 0: // UNINITIALIZED
                    case 1: // LOADING
                    case 2: // LOADED
                    case 3: // INTERACTIVE
                        break;
                    case 4: // COMPLETED
                        handleResponse(xmlhttpl.status, xmlhttpl.responseText);
                        break;
                    default:
                        console.log("error")
                }
            }

            urllaunch = "http://localhost:1210/game/launch/";
            var xmlhttpl = new XMLHttpRequest();
            xmlhttpl.onreadystatechange = handleStateChange;
            xmlhttpl.open("POST", urllaunch, true);
            xmlhttpl.send(payload);



            // // $(".launch").click(function(e) {
            // //         e.preventDefault();
            //         var e = "retroarch -L /home/pi/RetroPie/emulatorcores/fceu-next/fceumm-code/fceumm_libretro.so /home/pi/RetroPie/roms/nes/Contra.nes";
            //         $.ajax({
            //                     async: false,
            //                     type: "POST",
            //                     url: 'http://localhost:1210/game/launch',
            //                     data: {launch: e},
            //                     timeout: 5000,
            //                     success: function (msg, status, jqXHR) { 
            //                           // Do something on launch of game? Notify Server? Emit message?
            //                                                             }
            //                     });

            //     // });

            // need:
            // Emulator Core
            // Paramaters for RetroArch
            // 

            // Pass JSON node of selected emu and add game path?

        }


};