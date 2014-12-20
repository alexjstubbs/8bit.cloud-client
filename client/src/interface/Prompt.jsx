/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons')
,   navigationInit  = require('../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            message: "Are you sure?",
            agree: "closeDialog",
            disagree: "closeDialog"
        }
    },


    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    render: function() {

        return (

            <div className="parent">

                <div className="well">{this.props.message}</div>

                <hr />

                <button className="navable btn btn-alt btn-alt-size" data-function="closeDialog">Cancel</button>
                <button className="navable btn btn-alt btn-alt-size" data-function={this.props.agree}>Yes</button>

            </div>


        );
    }
});
