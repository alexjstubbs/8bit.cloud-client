/**
* @jsx React.DOM
*/

var React               = require('react/addons')
,   _                   = require('lodash')
,   moment              = require('moment')
,   api                 = require('socket.io-client')('/api')
,   navigationInit      = require('../js/navigation.init');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            friends: []
        }
    },

    componentDidMount: function () {
        navigationInit.navigationDeinit();
    },


    render: function() {

        navigationInit.navigationDeinit();

    return (

        <div className="parent">

            <i className="ion-trophy"></i> Achievement Unlocked!

        </div>

            );
        }

});
