/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    actionString,
    eventString = ["ok"];


module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: false,
            subNavable: true,
            navStack: 1,
            eventSet: null,
            eventType: "message",
            timestamp: null,
            classString: "icon large-icon-bg "
        };
    },
    render: function() {

        if (this.props.eventType) {
            eventString = _.filter(this.props.eventSet, {"Type": this.props.eventType});
        }

        else {
            eventString = this.props.eventSet;
        }


        return (

        <div className="col-xs-4">
            <span><i className={eventString.length ? this.props.classString + eventString[0].icon : this.props.classString}></i> &nbsp; <span className="large-notification">{this.props.eventAppend}</span></span>
            <span className="muted left-adjust">{eventString.length ? eventString[0].shortcut : " "} to update</span>
        </div>

        );
    }
});
