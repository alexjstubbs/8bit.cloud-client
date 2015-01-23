/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   ListedGame      = require('./ListedGame.jsx')
,   api             = require('socket.io-client')('/api')
,   navigationInit  = require('../js/navigation.init')
,   removeBrackets  = require('../js/helpers').removeBrackets;

module.exports = React.createClass({


     getInitialState: function() {
        return {
            gamesList: [
                {"filename":"","ext":"","title":"","CRC32":"","achievements":""}
             ]
        };
    },

     componentDidMount: function() {

         var Obj = {
             platform: "Nintendo",
             start: 0
         }

        api.emit('request', { request: 'gamesList', param: Obj });

        // One-off for appending paged results
        var component = this;

        api.on('api', function(object) {

            if (object.gamesList) {

                var a = object.gamesList,
                    b = [];

                object.page ? b = component.state.gamesList : b = [component.state.gamesList[0]];

                var c = b.concat(a);

                component.setState({gamesList: _.rest(c)});

            }

        });

    },

    componentDidUpdate: function() {

        var nodeList = document.querySelectorAll(".left_alpha");

        var alpha_list = [];
        _(this.state.gamesList).forEach(function(_char, index) {

            index--;

            var alpha = _char.filename.charAt(0);

                if (nodeList[index] && _.contains(alpha_list, alpha) == false) {
                    nodeList[index].innerHTML = alpha;
                }

             alpha_list.push(alpha);

             var _alert = (document.getElementById("ui-alert"));

             if (_alert) _alert.remove();

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

        if (this.state.gamesList) {

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

        }

        else {
            listNodes = <div className="vertica-align"><h3 className="mute"><i className="ion-information-circled"></i> &nbsp; No Games</h3><br /><button className="navable btn btn-alt purple-bg"><i className="ion-plus"></i> &nbsp; Add Games Now</button></div>;
        }

        return (

                <div className="col-xs-4 alpha_list navable" data-mute='true' data-function={this.props.functionCall} data-function-deprecated='launchGame' id="alpha_list">
                    <table className="table table-striped" id="list">
                        <tbody id="alpha_list_tbody">
                            { listNodes }
                        </tbody>
                    </table>
                </div>

            );
    }
});
