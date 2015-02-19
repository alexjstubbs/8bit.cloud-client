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
            icon: "ion-ios-heart-outline ",
            functionCall: "demoGame",
            username: "Unkown",
            action: "gameplay",
            game: null,
            system: 'Super Nintendo',
            timestamp: null
        };
    },

    render: function() {

        var launchContext = {
            platform: this.props.platform,
            filepath: this.props.filepath,
            shortname: this.props.shortname,
            longname: this.props.game
        };

        launchContext = JSON.stringify(launchContext);

        var cx = React.addons.classSet;
        var classes = cx({
            'square': true,
            'purple-bg': true
        });


        return (

        <tr className={this.props.subNavable ? "subNavable" : ""} data-snav={this.props.navStack} data-function="favoriteCut" data-parameters={launchContext}>

            <td className="td_square"><div className={classes}><i className={this.props.icon}></i></div></td>

            <td>
                <strong>{this.props.game}</strong>

                <br />

                {this.props.system}

            </td>

            <td className="text-right"> Last Played: {this.props.timestamp}</td>

        </tr>

        );
    }
});
