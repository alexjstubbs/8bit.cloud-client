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
        };
    },

    componentDidMount: function() {
        var component = this;

        if (this.props.navStack == 1) {
            component.props.classList = "platform navable navable-row";
        }
    },

    render: function() {
        return (
              <li className={this.props.classList} data-emulators={this.props.emulators} data-ext={this.props.ext} data-function={this.props.functionCall} data-parameters={this.props.short} data-order={this.props.navStack} data-title={this.props.platform}>{this.props.platform}</li>
        )
    }
});
