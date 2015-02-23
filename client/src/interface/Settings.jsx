/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    _               = require('lodash'),
    api             = require('socket.io-client')('/api'),
    mixins          = require('./mixins/mixins.jsx');

/* Components
-------------------------------------------------- */

module.exports = React.createClass({

    mixins: [mixins.listener, mixins.screenMount],

    getInitialState: function() {
        return {

            settingsObject: {},

        };
    },


    componentWillUpdate: function(props, state) {
            // console.log(props);
    },

    getDefaultProps: function() {
        return {
            screen: "Settings"
        };
    },

    screenMount: function() {
        console.log("settings");
    },

    componentDidMount: function() {

    },

    render: function() {

        console.log(this.state);

        return (

            <div id="settings">


            </div>
        )
    }
});
