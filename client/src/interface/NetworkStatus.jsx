/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    api = require('socket.io-client')('/api');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            ip: '127.0.0.1',
            isOnline: false
        };
    },

    componentDidMount: function () {

        var _this = this;
        var user = this.props.username;

        api.emit('request', { request: 'isOnline', param: null});
        api.emit('request', { request: 'ipInfo', param: null});

        api.on('api', this.setState.bind(this));

     },

    render: function() {

        var inlineStyle = {
            padding: '2px 10px'
        };


        var cx = React.addons.classSet;
        var classes = cx({
            'ion-ios-circle-outline': true,
            'purple': true,
            'green': this.state.isOnline
        });

        return (
            <span>
                <span className="muted well-alt online" data-location={this.state.ip} style={inlineStyle}><strong><i className={classes}></i></strong> {this.state.isOnline ? "Online" : "Offline"}</span>
            </span>
            )
    }
});
