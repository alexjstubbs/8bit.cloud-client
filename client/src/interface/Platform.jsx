/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash');


module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: false,
            subNavable: true,
            navStack: 1,
            functionCall: "switchEmulator",
            functionParams: 0,
            platform: null
        }
    },

    render: function() {


        return (
        
              <li className="platform navable" data-function={this.props.functionCall} data-paramaters={this.props.functionParams} data-order={this.props.navStack}>{this.props.platform}</li>
        )
    }
});

