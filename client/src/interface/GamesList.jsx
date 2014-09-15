/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
        _ = require('lodash'),
        ListedGame = require('./ListedGame.jsx'),
        api = require('socket.io-client')('/api'),
        keyboard = require('./mixins/KeyboardShortcutsMixin'),
        removeBrackets = require('../js/helpers').removeBrackets;

module.exports = React.createClass({
     getInitialState: function() {
        return {
            gamesList: [
                {"filename":"","ext":"","title":"","CRC32":"","achievements":""}
             ]
        };
    },

     componentDidMount: function() {
   
        api.emit('request', { request: 'gamesList', param: "Nintendo" });
        api.on('api', this.setState.bind(this));

    },

    componentDidUpdate: function() {
        // console.log(this.state.gamesList);

        var nodeList = document.querySelectorAll(".left_alpha");

        var alpha_list = [];
        _(this.state.gamesList).forEach(function(_char, index) {

            index--;

            var alpha = _char.filename.charAt(0);

                if (nodeList[index] && _.contains(alpha_list, alpha) == false) {
                    nodeList[index].innerHTML = alpha;
                }

             alpha_list.push(alpha);
        });
    },
      
    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            functionCall: "largeProfile",
            functionParams: ""
        }
    },

    render: function() {

        var skipped;

        var listNodes = this.state.gamesList.map(function (game, i) {
            var gameTitle = removeBrackets(game.title);
            
            if (gameTitle) {
                if (skipped == true) {
                    
                    return <ListedGame key={i.id} navStack={i} game={gameTitle} filename={game.filename} path={game.path} />
                    skipped = false;
                }
                else {
                    return <ListedGame key={i.id} navStack={i+1} game={gameTitle} filename={game.filename} path={game.path} />
                }
            }
            else {
                skipped = true;
            }
           
        });

        return (

                <div className="col-md-4 alpha_list navable" data-mute='true' data-function={this.props.functionCall} data-function-deprecated='launchGame' id="alpha_list">
                    <table className="table table-striped" id="list">
                        <tbody>
                            { listNodes } 
                        </tbody>
                    </table>   
                </div> 

            );
    }
});