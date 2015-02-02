/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    _               = require('lodash'),
    UserProfile     = require('./UserProfile.jsx'),
    HeaderGroup     = require('./HeaderGroup.jsx'),
    FriendsBox      = require('./FriendsBox.jsx'),
    RecentActivity  = require('./RecentActivity.jsx'),
    api             = require('socket.io-client')('/api'),
    Favorites       = require('./Favorites.jsx'),
    Community       = require('./Community.jsx'),
    IgnitionEvents  = require('./IgnitionEvents.jsx'),
    ShortcutBar     = require('./ShortcutBar.jsx'),
      mixins          = require('./mixins/mixins.jsx'),
    unreadMessages,
    favorites       = [];


// ,   watch           = ["isOnline", "ipInfo", "session", "eventSet", "messages"]

/* Sample Data for Development
-------------------------------------------------- */


var actionSet = [
    {"type": "Achievement", "string": "unlocked an achievement in", "icon": "ion-trophy", "color": "gold-bg"},
    {"type": "Gameplay", "string": "recently played", "icon": "ion-ios-game-controller-a", "color": "red-bg"}
];

var ignitionEvents = [
    {'Type': 'Update', 'copy': 'Ignition 1.0 released!', 'username': ''},
    {'Type': 'message', 'copy': 'Hey Whats Up?', 'username': "Roman"},
    {'Type': 'file', 'copy': 'Sent you a save file', 'username': "Andie"},
];

var eventSet = [
    {"Type": "Update", "string": ignitionEvents[0].copy, "icon": "ion-fork-repo", "shortcut": "F5"},
    {"Type": "message", "string": ignitionEvents[1].copy, "icon": "ion-ios-chatboxes", "shortcut": "F6"},
    {"Type": "file", "string": ignitionEvents[2].copy, "icon": "ion-paper-airplane", "shortcut": "F6"},
];

/* Components
-------------------------------------------------- */

module.exports = React.createClass({

    mixins: [mixins.listener, mixins.screenMount],

    getInitialState: function() {
        return {
            isOnline:       false,

            ipInfo:         "",

            session:        {},
            eventSet:       {},

            messages:       []
        };
    },


    getDefaultProps: function() {
        return {
            screen: "Dashboard"
        };
    },

    screenMount: function() {

        var component = this;

        setTimeout(function() {

            var path = 'http://127.0.0.1:1210/database/favorites';

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange=function() {

                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                    var data = xmlhttp.responseText;

                    var JSONified = JSON.parse(data);

                    favorites = JSONified;

                    component.forceUpdate();

                }
            };

            xmlhttp.open("GET",path,true);
            xmlhttp.send();

            return;

        }, 500);

    },

    componentDidMount: function() {

        var component = this;

        api.emit('request', { request: 'getSession'} );
        api.emit('request', { request: 'messages'});

        api.on('network-api', function(data) {

            if (data.messages) {

            var allMessages = _.flatten(data.messages, '_id');
            var readMessages = localStorage.getItem("read_messages");

            if (readMessages) {
                readMessages = readMessages.split(",");
            }

            unreadMessages = _.difference(allMessages, readMessages).length;

            component.forceUpdate();


            }

        });

    },

    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'container-fluid': true,
            'parent': true
        });

        return (

            <div id="home" className={classes}>

                <UserProfile />

                <HeaderGroup myMessages={this.state.messages} unread={unreadMessages}/>

                <div className="clearfix"></div>
                <br />

                <div className="container-fluid" id="area">
                <div data-screen='home' className="screen">

                    <RecentActivity actionSet={actionSet} />
                    <Favorites favorites={favorites} />

                    { this.state.isOnline ? <Community /> :  <span><br /><br /><img src="../src/img/offline-community.jpg" className="col-xs-4 img-responsive" /></span> }


                </div>
                </div>

                <IgnitionEvents eventSet={eventSet} />

                <div class="clearfix"></div>
                <br />

                <ShortcutBar />

            </div>
        )
    }
});
