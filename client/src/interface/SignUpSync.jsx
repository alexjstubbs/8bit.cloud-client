/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons'),
    navigationInit  = require('../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            message: "Are you sure?",
            agree: "closeDialog",
            disagree: "closeDialog",
            parameters: null
        };
    },


    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    render: function() {

        return (

            <div className="parent" id="signup-status-window">

                <p id="signup-status" className="center-notice">Setting up new profile...</p>

                <h1 id="signup-status-icon" className="text-center">
                    <i className="animate-spin ion-android-sync"></i>
                </h1>

                <br />

                <button id="signup-status-button" className="navable btn btn-alt btn-block" data-function="closeDialog">Cancel</button>

            </div>

        );
    }
});
