module.exports = function(path, height, width, left, top) {


        // fetches content from a specified path and displays it in a lightbox

        var backdrop = document.createElement("div");
        var content = document.createElement("div");

        // use AJAX to load the content from the page
        var request = new XMLHttpRequest();

        console.log(path);
        request.open("GET", path, false);

        var handleAjaxEvent = function() {
            if (request.readyState == 4) {

                console.log(request.responseText);
                // content.innerHTML = request.responseText;
                document.querySelector('.selectedNav').classList.remove('selectedNav');
                if (request.responseText == "1") {
                    content.innerHTML = "<br /><img src='../img/demo/mail1.png' class='img-responsive navable selectedNav' data-nav='5'><br /> <img data-function='demoMsg' data-parameters='close' class='navable img-responsive' src='../img/demo/mail2.png' data-nav='6'><br /> <img class='img-responsive navable' src='../img/demo/mail3.png' data-nav='7'> <br /><img class='navable img-responsive' src='../img/demo/mail4.png' data-nav='8'><br /><hr /><div class='pull-right'><a data-nav='9' class='btn-alt navable' style='font-size:1em !important;font-weight:100 !important'><i class='ion-paper-airplane'></i> &nbsp; Create New Message</a> &nbsp; <a style='font-size:1em !important;font-weight:100 !important' class='btn-alt navable' data-function='closeLightbox'><i class='ion-close'></i> &nbsp; Close Messages</a>";
                }
                if (request.responseText == "2") {

                    var currentSelection = document.querySelectorAll(".systemNotificationContent");
                    var currentBackdrop = document.querySelectorAll(".systemNotificationContentBackdrop");
                    currentSelection[0].style.opacity = "0";
                    currentBackdrop[0].style.opacity = "0";
                    content.innerHTML = "<img class='img-responsive' src='../img/invitedemo.png'><hr /><div class='pull-right'><a class='btn-alt navable' style='font-size:1em !important;font-weight:100 !important' data-function='closeLightbox' data-parameters='close'><i class='ion-close'></i> &nbsp; Decline Invitation</a> &nbsp; <a data-nav='1' class='btn-alt navable' style='font-size:1em !important;font-weight:100 !important'><i class='ion-arrow-return-left'></i> &nbsp; Reply with Message</a> &nbsp; <a style='font-size:1em !important;font-weight:100 !important' data-function='closeLightbox' class='btn-alt navable selectedNav' data-nav='12'><i class='ion-ios7-play'></i> &nbsp; Accept & Play</a></div>";
                }

                if (request.responseText == "3") {
                    content.innerHTML = "<img src='../img/demo/gameplay.png' class='img-responsive navable' data-nav='5'><hr /><div class='pull-right'><a data-nav='9' class='btn-alt navable' style='font-size:1em !important;font-weight:100 !important'><i class='ion-person-add'></i> &nbsp; Invite for Multiplayer</a> &nbsp; <a data-nav='9' class='btn-alt navable' style='font-size:1em !important;font-weight:100 !important'><i class='ion-loading-c'></i> &nbsp; Resume Game</a> &nbsp; <a style='font-size:1em !important;font-weight:100 !important' class='btn-alt navable selectedNav' data-function='closeLightbox'><i class='ion-play'></i> &nbsp; Play Game</a></div>";
                }

                if (request.responseText == "4") {
                    content.innerHTML = "<h2 class='pull-left' style='font-weight:100;'> <i class='ion-person-stalker'></i> &nbsp;Online <span class='badge badge-purple hidden' style='position:relative;top:-10px;left:-5px;'>2</span></h2> <h2 style='font-weight:100;margin-left:10px;position:relative;right:330px' class='pull-right mute'> <i class='fa fa-meh-o'></i> &nbsp;Offline</h2><br /><br /><br /><div class='clearfix'></div>  <div class='pull-left'><img src='../img/demo/friend1.png' class='img-responsive navable selectedNav' data-nav='5'><img src='../img/demo/friend2.png' img-responsive navable' data-nav='5'></div>  <div class='pull-right'><img src='../img/demo/friend1.png' class='img-responsive mute' data-nav='5'><img src='../img/demo/friend2.png' class='img-responsive  mute' data-nav='6'><img src='../img/demo/friend2.png' class='img-responsive  mute' data-nav='6'><img src='../img/demo/friend2.png' class='img-responsive  mute' data-nav='6'></div><div class='clearfix'></div><hr /></div><div class='pull-right'><a style='font-size:1em !important;font-weight:100 !important' class='btn-alt navable' data-nav='7'>Add a Friend</a> &nbsp; <a style='font-size:1em !important;font-weight:100 !important' class='btn-alt navable' data-nav='7' data-function='closeLightbox'>Close</a></div></div>";
                }

                if (request.responseText == "5") {
                    content.innerHTML = "<br /><img class='img-responsive' src='../img/demo/community.png'> <hr /><a style='font-size:1em !important;font-weight:100 !important' class='btn-alt navable' data-nav='7' data-function='closeLightbox'><i class='ion-play'></i> &nbsp; Play Game</a><div class='pull-right'><a style='font-size:1em !important;font-weight:100 !important' class='btn-alt navable' data-nav='7' data-function='closeLightbox'><i class='ion-ios7-help-outline'></i> &nbsp; About the Club</a> &nbsp; <a style='font-size:1em !important;font-weight:100 !important' class='btn-alt navable selectedNav' data-nav='7' data-function='closeLightbox'><i class='ion-ios7-chatboxes-outline'></i> &nbsp; Discuss</a></div>";
                }
            }
        }

        request.onreadystatechange = handleAjaxEvent;
        request.send();

        backdrop.setAttribute("id", "backdrop");
        backdrop.style.position = "fixed";
        backdrop.style.top = 0;
        backdrop.style.height = "100%";
        backdrop.style.left = 0;
        backdrop.style.width = "100%";
        backdrop.style.zIndex = 500;
        backdrop.style.background = "black";
        backdrop.style.opacity = 0.8;
        backdrop.className = "systemNotificationContentBackdrop";
        content.style.position = "fixed";
        content.style.top = "10%";
        content.style.left = "10%";
        content.style.width = "80%";
        content.style.zIndex = 600;
        content.style.border = "none";
        content.style.overflow = "hidden";
        content.style.background = "white";
        content.className = "systemNotificationContent animated bounceInDown";
        content.setAttribute("id", "lightbox");


        if (width) {
            content.style.width = width + "%";
        } else {
            content.style.width = "80%";
        }

        if (height) {
            content.style.height = height + "%";
        } else {
            content.style.height = "80%";
        }

        if (left) {
            content.style.left = left + "%";
        } else {
            content.style.left = "10%";
        }

        if (top) {
            content.style.top = top + "%";
        } else {
            content.style.top = "10%";
        }

        document.body.appendChild(backdrop);
        document.body.appendChild(content);

        var removeLightbox = function() {
            document.body.removeChild(backdrop);
            document.body.removeChild(content);
        }

        // remove the lightbox when people click on the backdrop
        backdrop.addEventListener("click", removeLightbox);
        // backdrop.addEventListener("keydown", removeLightbox);

};