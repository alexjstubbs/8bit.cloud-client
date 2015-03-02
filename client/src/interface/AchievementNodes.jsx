/**
 * @jsx React.DOM
 */

/* TODO: Get event listener to update state correctly on newly stored games.
-------------------------------------------------- */

'use strict';

var React           = require('react/addons'),
    api             = require('socket.io-client')('/api'),
    _               = require('lodash'),
    helpers         = require('../js/helpers.js'),
    AchievementList = require('./AchievementList.jsx'),
    mixins          = require('./mixins/mixins.jsx'),
    achieved        = 0,
    achievementsLen = 0,
    launchContext   = {},
    gameInfo;

module.exports = React.createClass({

    mixins: [mixins.listener],

    getInitialState: function() {

        return {

            "id":             "",
            "title":          "",
            "genre":          "",
            "image":          "",
            "filepath":       "",
            "developer":      "",
            "description":    "",
            "boxart":         "",
            "playtime":       "Never Played",

            "rating":         {},
            "gameInfo":       {},
            "updateGame":     {},
            "esrb_rating":    {},

            "gamesList":      [],
            "platforms":      [],

            "savestates": [{"slot": 1, "time": "1/12/1 1pm", "path": "/root/software/saves/blah.srm"}],

            "crc32":          null,

            "favorite":       false


        };
    },

    componentDidUpdate: function(props, state) {

        if (state) {
            localStorage.setItem("gameInfo", JSON.stringify(state));
        }

    },

    componentDidMount: function () {

        var component = this;

        window.addEventListener('updateGame', function eventHandler(e) {
            component.setState(e.detail);
        });


     },

    render: function() {

        // console.log(this.props);

        gameInfo = localStorage.getItem("gameInfo");

        if (helpers.isJSON(gameInfo)) {

            gameInfo = JSON.parse(gameInfo);

            achieved        = 0;
            achievementsLen = 0;

            if (gameInfo) {

                if (gameInfo.crc32 && gameInfo.crc32 != "null") {

                    var achievementNodes = gameInfo.crc32[0].Achievements.map(function (achievement, i) {
                        return <AchievementList title={achievement.title} description={achievement.description} navStack={i+1} />
                    });

                    achievementsLen = gameInfo.crc32[0].Achievements.length;
                    achieved = document.querySelectorAll(".achieved").length;

                }
            }

            return (

            <div className="parent">

                <span className="achievement-stats">{achieved} out of {achievementsLen} Accomplished.</span>

                <ul id="achievements">

                     {achievementNodes}

                </ul>

                {this.props.control ? <span><hr className="hr-thin" /> <button className="navable btn btn-lg btn-alt btn-block" data-function="closeDialog">Close Dialog</button></span> : null }


            </div>


            )
        }

    }

});
