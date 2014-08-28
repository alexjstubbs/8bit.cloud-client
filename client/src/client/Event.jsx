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
            icon: "ion-game-controller-a ",
            functionCall: "viewMessages",
            username: "Unkown",
            action: "gameplay",
            game: null,
            eventSet: [],
            eventType: "",
            timestamp: null,
            classString: "icon large-icon-bg "
        }
    },
    render: function() {

        var eventString = _.filter(this.props.eventSet, {"type": this.props.eventType});


        return (

// {'type': 'release', 'copy': 'Ignition 1.0 released!', 'shortcut': 'F5', 'username': ''},

        <div className="col-md-3">
            <span><i className={this.props.classString + eventString[0].icon}></i><span className="large-notification">{this.props.username} {eventString[0].string}</span></span>
            <span className="muted left-adjust">{eventString[0].shortcut} to update</span>
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
