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
            platform: null,
            classList: "platform navable"
        }
    },

    render: function() {
        return (
              <li className={this.props.classList} data-emulators={this.props.emulators} data-ext={this.props.ext} data-function={this.props.functionCall} data-parameters={this.props.short} data-order={this.props.navStack}>{this.props.platform}</li>
        )
    }
});

