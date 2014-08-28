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
            functionCall: "demoGame",
            username: "Unkown",
            action: "gameplay",
            game: null,
            system: 'Super Nintendo',
            timestamp: null
        }
    },
    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'square': true,
            'purple-bg': true
        });
        return (
        
        <tr className={this.props.subNavable ? "subNavable" : ""} data-snav={this.props.navStack}>
            <td className="td_square"><div className={classes}><i className={this.props.icon}></i></div></td>
            <td><strong>{this.props.game}</strong><br /> 
            {this.props.system}</td>
            <td className="text-right"> Last Played: {this.props.timestamp}</td>
        </tr>

        );
    }
});