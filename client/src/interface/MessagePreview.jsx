/**
 * @jsx React.DOM
 */

var React = require('react/addons'),
    _ = require('lodash'),
    NetworkStatus = require('./NetworkStatus.jsx');

// { "type": "text", "sender": "Alex Stubbs", "attachment": null, "timestamp": 2013121210230 }

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2
        }
    },

    render: function() {

        return (

            <div>
                <NetworkStatus username={this.props.sender} />
                {this.props.sender} 
                <div class='clearfix'></div><br />
            </div>              
         
        );
    }
});



