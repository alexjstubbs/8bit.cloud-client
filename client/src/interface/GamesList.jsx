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
                {"filename":"super castlevania.zip","ext":".nes","title":"Super Mario Brothers","CRC32":"D445F698","achievements":{"CRC32":["D445F698","3337ec46","3448e736"],"SHA1":["FACEE9C577A5262DBE33AC4930BB0B58C8C037F7","ea343f4e445a9050d4b4fbac2c77d0693b1d0922"],"strict":false,"Hello World":{"description":"Get a Mushroom","address":"0x754","operator":"==","operand":"00","unique":"smb_getamushroom","count":true,"single":true},"Goodbye World":{"description":"Die once (test)","address":"0x000E","operator":"==","operand":"0B","unique":"smb_die","count":true,"single":true},"Crouching":{"description":"Crouch (test)","address":"0x06D5 ","operator":"==","operand":"50","unique":"smb_crouch","count":true,"single":true}}}
             ]
        };
    },

     componentDidMount: function() {
   
        api.emit('request', { request: 'gamesList', param: "Nintendo" });
        api.on('api', this.setState.bind(this));

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
                    return <ListedGame key={i.id} navStack={i} game={gameTitle} />
                    skipped = false;
                }
                else {
                    return <ListedGame key={i.id} navStack={i+1} game={gameTitle} />
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