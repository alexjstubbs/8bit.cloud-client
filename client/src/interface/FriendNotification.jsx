/**
* @jsx React.DOM
*/

var React               = require('react/addons'),
    _                   = require('lodash'),
    moment              = require('moment'),
    api                 = require('socket.io-client')('/api'),
    navigationInit      = require('../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            shortcutkey: <span>&circ;i</span>
        };
    },

    componentDidMount: function () {
        // navigationInit.navigationDeinit();
    },

    render: function() {

        // navigationInit.navigationDeinit();

    return (

        <div className="parent">

            <div className="icon-modal-container-primary col-xs-3">
                <i className="ion-person"></i>
            </div>

            <div className="col-xs-9 achievement-title-container">

                <h3>{this.props.friend.object.Username} is online!</h3>
                <span className="modal-achievement-desc">{this.props.shortcutkey} to invite to a game</span>
            </div>

        </div>

            );
        }

});
