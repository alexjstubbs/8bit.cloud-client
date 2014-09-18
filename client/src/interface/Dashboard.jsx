/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    UserProfile = require('./UserProfile.jsx'),
    HeaderGroup = require('./HeaderGroup.jsx'),
    FriendsBox = require('./FriendsBox.jsx'),
    RecentActivity = require('./RecentActivity.jsx'),
    Favorites = require('./Favorites.jsx'),
    Community = require('./Community.jsx'),
    IgnitionEvents = require('./IgnitionEvents.jsx'),
    ShortcutBar = require('./ShortcutBar.jsx'),
    init = require('../js/init.js');

    init();

/* Sample Data for Development
-------------------------------------------------- */

var myProfile = [
    {"username": "Alex", "online": false}
]

var myMessages = [
    {"username": "Sergeant Stubbs", "attachment": false, "body": "Hey whats up??"},
    {"username": "Andie", "attachment": true, "body": "Yo"}
]

var activities = [
    { 'username': 'Sergeant Stubbs', 'activity': "gameplay", "timestamp": "2013121210230", "game": "Castlevania"},
    { 'username': 'Ascetic0990',   'activity': "achievement", "timestamp": "2014081210323", "game": "Resident Evil"},
    { 'username': 'Alex', 'activity': "gameplay", "timestamp": "2013121210230", "game": "Super Mario"},
    { 'username': 'Andie',   'activity': "achievement", "timestamp": "2012081210323", "game": "Resident Evil"}
];

var actionSet = [
    {"type": "achievement", "string": "unlocked an achievement in", "icon": "ion-trophy", "color": "gold-bg"},
    {"type": "gameplay", "string": "recently played", "icon": "ion-game-controller-b", "color": "red-bg"}
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
    {"Type": "message", "string": ignitionEvents[1].copy, "icon": "ion-ios7-chatboxes", "shortcut": "F6"},
    {"Type": "file", "string": ignitionEvents[2].copy, "icon": "ion-paper-airplane", "shortcut": "F6"},
];
/* Components
-------------------------------------------------- */
     
module.exports = React.createClass({


    getInitialState: function() {
        return {
            hidden: false,
            parent: true
        };
    },

    getDefaultProps: function() {
        return {
            hidden: false,
            parent: true
        }   
    },

    screenTransition: function(e) {
        if (e.detail.screen === "Dashboard") {
            this.setProps(e.detail);
            document.getElementById("main").setAttribute("data-screen", "dashboard");
        }
    },

    componentDidMount: function() {

        var component = this;
        window.addEventListener('screenTransition', function eventHandler(e) {
              component.screenTransition(e);
        });

    },

    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'container-fluid': true,
            'hidden': this.props.hidden,
            'parent': this.props.parent
        });


        return (

            <div id="home" className={classes}>
            
            <UserProfile username={myProfile[0].username} isOnline={myProfile[0].username} />
            <HeaderGroup myMessages={myMessages} />
            
            <div className="clearfix"></div> 
            <br />

            <div className="container-fluid" id="area"> 
            <div data-screen='home' className="screen">

            <RecentActivity activities={activities} actionSet={actionSet} />
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