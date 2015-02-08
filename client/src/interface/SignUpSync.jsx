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

            <div className="parent">

                <p className="center-notice"><i className="animate-spin ion-android-sync"></i> Setting up new profile...</p>

                    <hr />

                    <button className="navable btn-alt btn btn-lg btn-block" data-function="closeDialog">Cancel</button>

            </div>


        );
    }
});
