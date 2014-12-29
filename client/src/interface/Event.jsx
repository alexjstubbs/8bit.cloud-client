/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    actionString;


module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: false,
            subNavable: true,
            navStack: 1,
            eventSet: [],
            eventType: "message",
            timestamp: null,
            classString: "icon large-icon-bg "
        }
    },
    render: function() {

        if (this.props.eventType) {
            var eventString = _.filter(this.props.eventSet, {"Type": this.props.eventType});
        }

        else {
            var eventString = this.props.eventSet;
        }

        return (

        <div className="col-xs-4">
            <span><i className={eventString ? this.props.classString + eventString[0].icon : this.props.classString}></i><span className="large-notification">{this.props.eventAppend}</span></span>
            <span className="muted left-adjust">{eventString ? eventString[0].shortcut : " "} to update</span>
        </div>
        
        // <tr className={this.props.subNavable ? "subNavable" : ""} data-snav={this.props.navStack}>
        //     <td className="td_square"><div className={classes +" "+ actionString[0].color}><i className={actionString[0].icon}></i></div></td>
        //     <td><strong>{this.props.username}</strong><br /> 
        //     {actionString[0].string} {this.props.game}</td>
        //     <td className="text-right"> {this.props.timestamp}</td>
        // </tr>

        );
    }
});
