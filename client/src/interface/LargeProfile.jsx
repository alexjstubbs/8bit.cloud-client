/**
 * @jsx React.DOM
 */

/* TODO: Get event listener to update state correctly on newly stored games.
-------------------------------------------------- */

'use strict';

var React           = require('react/addons')
,   api             = require('socket.io-client')('/api')
,   _               = require('lodash')
,   SaveStates      = require('./SaveStates.jsx')
,   AchievementList = require('./AchievementList.jsx')
,   launchContext   = {};

module.exports = React.createClass({

  getInitialState: function() {

        return {

            "screen": "Profile",
            "title": "Unknown Title",
            "boxart": null,
            "image": null,
            "genre": "Action > Adventure",
            "playtime": "Never Played",
            "savestates": [
                {"slot": 1, "time": "1/12/1 1pm", "path": "/root/software/saves/blah.srm"}
            ],
            "crc32": null,
            "developer": null,
            "filepath": null,
            "platform": null
        };
    },

    screenMount: function() {
    },

    componentDidMount: function () {

        var component = this;

        window.addEventListener('updateGame', function eventHandler(e) {
            component.setState(e.detail);
        });

        document.addEventListener('launchContext', function eventHandler(e) {
            console.log("got one");
            launchContext = JSON.stringify(e.detail);
            console.log(launchContext);
            component.forceUpdate();
        });


        api.on('api', this.setState.bind(this));

        window.addEventListener("mountView", function(e) {

            if (e.detail.screen == component.state.screen) {
                component.screenMount();
            };

        });

     },

    render: function() {

        var saveNodes = this.state.savestates.map(function (state, i) {
            return <SaveStates filename={state.filename} image={state.image} slot={state.slot} navStack={i+1} />
        });

        if (this.state.crc32) {

            var achievementNodes = this.state.crc32[0].Achievements.map(function (achievement, i) {
                return <AchievementList title={achievement.title} description={achievement.description} navStack={i+1} />
            });

        }

        return (

        <div id="Profile">

        <div className="container-fluid parent">

         <div className="clearfix"></div>

         <br /><br />

         <div className="col-xs-2" id="profile-boxart">

            {this.state.image ? <img src={this.state.image} className="img-responsive" /> : <div id="no-boxart"> <i className='icon ion-image'></i> </div> }


            <ul id="profile-sub-buttons" className="hidden">
               <li><button className='btn btn-purple'><i className='fa fa-video-camera '></i> &nbsp; Live Stream</button></li>
            </ul>
         </div>

         <div className="col-xs-4" id="profile-gameinfo">
            <h2 id="profile-gametitle">{this.state.title}</h2>
            <span className='muted'>{this.state.genre}</span>
            <br />
            <div className="timer">Time Played: {this.state.playtime}</div>
            <br />
            <a id="play-game" className='btn-alt btn-lg navable' data-function="launchGame" data-parameters={launchContext}>Play Game</a>
            &nbsp;
            <a className='btn-alt btn-lg navable'>Multiplayer</a>
            <a className='btn-alt btn-lg navable' data-function='softwareOptions' data-parameters={launchContext}><i className="ion-gear-a"></i></a>

         </div>

            {saveNodes}

        <div className="col-xs-9 profile-section">
            <h1>Achievements <span className="achievement-stats">0 out of 0 Accomplished.</span></h1>
        <ul id="achievements">

             {achievementNodes}

        </ul>
        </div>

         <div className="col-xs-10 profile-section hidden">
            <h1>Screenshots</h1>

         </div>

         <div className="col-xs-10 profile-section hidden">
            <h1>Description</h1>
            <br />
            <p>He's Back! And this time the evil Dr. Wily (once the supreme power in the universe) has created even more sinister robots to mount his attack. But as MegaMan, you've also grown in power and ability. Can you save mankind from the evil desires of Dr. Wily? Each of the eight empires is ruled by a different super-robot. You must defeat each enemy on his own turf, building up weapons as you go. Only after all are destroyed will you go head-on with the mastermind himself, the evil Dr. Wily. </p>
         </div>

         <div className="col-xs-10 profile-section hidden">
            <h1>Movies</h1>

         </div>

      </div>
   </div>

        )
    }
});
