/**
 * @jsx React.DOM
 */

'use strict';

var React               = require('react/addons'),
    _                   = require('lodash'),
    ListedGame          = require('./ListedGame.jsx'),
    api                 = require('socket.io-client')('/api'),
    navigationInit      = require('../js/navigation.init'),
    removeBrackets      = require('../js/helpers').removeBrackets,
    browserNavigation   = require('../js/navigation.browser.js').browserNavigation;

module.exports = React.createClass({

     getInitialState: function() {
        return {
            gamesList: [
                {"filename":"","ext":"","title":"","CRC32":"","achievements":""}
             ],
             total: 0
        };
    },

     componentDidMount: function() {

         var Obj = {
             platform: "Nintendo",
             start: 0
         };

        api.emit('request', { request: 'gamesList', param: Obj });

        // One-off for appending paged results
        var component = this;

        api.on('api', function(object) {

            if (object.gamesList) {

                if (object.gamesList != "null") {
                    var a = object.gamesList,
                        b = [],
                        total;

                    if (object.page)  {
                        b = component.state.gamesList;
                    }

                    else {
                        b = [component.state.gamesList[0]];
                    }

                    var c = b.concat(a);

                    component.setState({gamesList: _.rest(c), total: object.end});
                }

                else {
                    component.setState({gamesList: [{"filename":"","ext":"","title":"","CRC32":"","achievements":""}]});
                }

            }

        });


    },

    selectFirstNode: function() {

        browserNavigation();

    },


    componentDidUpdate: function() {


        var nodeList = document.querySelectorAll(".left_alpha");

        var alpha_list = [];
        _(this.state.gamesList).forEach(function(_char, index) {


            var alpha = _char.filename.charAt(0);


                if (nodeList[index] && _.contains(alpha_list, alpha) === false) {
                    nodeList[index].innerHTML = alpha.toUpperCase();

                }

                else {
                    if (nodeList[index]) {
                        nodeList[index].innerHTML = ".";
                    }
                }

             alpha_list.push(alpha);

             var _alert = (document.getElementById("ui-alert"));

             if (_alert) _alert.remove();


                         index--;
        }).value();

        this.selectFirstNode();

    },

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            functionCall: "largeProfile",
            functionParams: ""
        };
    },

    render: function() {

        var skipped;
        var component = this;

        if (this.state.gamesList) {

            var listNodes = this.state.gamesList.map(function (game, i) {

                var gameTitle = removeBrackets(game.title);

                if (gameTitle) {

                    if (skipped === true) {
                        return <ListedGame key={i.id} navStack={i} game={gameTitle} filename={game.filename} path={game.path} total={component.state.total} />
                        skipped = false;
                    }

                    else {
                        return <ListedGame key={i.id} navStack={i+1} game={gameTitle} filename={game.filename} path={game.path} total={component.state.total}  />
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

                <div className="col-xs-4 alpha_list navable navable-row" data-mute='true' data-function={this.props.functionCall} data-function-deprecated='launchGame' id="alpha_list">
                    <table className="table table-striped" id="list">
                        <tbody id="alpha_list_tbody">
                            { listNodes }
                        </tbody>
                    </table>
                </div>

            );
    }
});
