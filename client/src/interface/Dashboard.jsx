/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   UserProfile     = require('./UserProfile.jsx')
,   HeaderGroup     = require('./HeaderGroup.jsx')
,   FriendsBox      = require('./FriendsBox.jsx')
,   RecentActivity  = require('./RecentActivity.jsx')
,   api             = require('socket.io-client')('/api')
,   Favorites       = require('./Favorites.jsx')
,   Community       = require('./Community.jsx')
,   IgnitionEvents  = require('./IgnitionEvents.jsx')
,   ShortcutBar     = require('./ShortcutBar.jsx')
,   unreadMessages;

/* Sample Data for Development
-------------------------------------------------- */


var actionSet = [
    {"type": "Achievement", "string": "unlocked an achievement in", "icon": "ion-trophy", "color": "gold-bg"},
    {"type": "Gameplay", "string": "recently played", "icon": "ion-ios-game-controller-a", "color": "red-bg"}
];


var favorites = [
    { 'game': 'Super Castlevania', 'System': "Super Nintendo", "timestamp": "2013121210230"},
    { 'game': 'Super Mario', 'System': "Nintendo Entertainment System", "timestamp": "2013121210230"},
    { 'game': 'Tomb Raider', 'System': "Playstation", "timestamp": "2013121210230"},
    { 'game': 'Tomba!', 'System': "Playstation", "timestamp": "2013121210230"}

];

// var communityEvent = [
//     {'title': "Together Retro", "image": "http://www.racketboy.com/images/tr-lost-vikings.png", "url": "http://www.racketboy.com", "rss": "http://www.rackerboy.com?rss2", "imageStyles": '{"width": "90%", "height": "90%", "position": "relative", "left": "20px"}'}
// ];

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


    getInitialState: function() {
        return {
            messages: []
        };
    },

    getDefaultProps: function() {
        return {
            hidden: false,
            parent: true
        }
    },

    componentDidMount: function() {

        var _this = this;

        api.emit('request', { request: 'getSession'} );
        api.emit('request', { request: 'messages'});
        api.on('api', this.setState.bind(this));

        api.on('network-api', function(data) {

            if (data.messages) {

            var allMessages = _.flatten(data.messages, '_id');
            var readMessages = localStorage.getItem("read_messages");

            if (readMessages) {
                readMessages = readMessages.split(",");
            }

            unreadMessages = _.difference(allMessages, readMessages).length;

            _this.forceUpdate();


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
            <Community />

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
