/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    api = require('socket.io-client')('/api');

module.exports = React.createClass({
    
    getInitialState: function() {
        return {
            isOnline: false,
            ip: '127.0.0.1'
        };
    },

    componentDidMount: function () {

        var _this = this;
        var user = this.props.username;
        api.emit('request', { request: 'isOnline', param: this.props.username});
        api.emit('request', { request: 'ipInfo', param: null});
        
        api.on('api', function(response) {
    
            if (response.username == user) { 
                _this.setState({isOnline: response.isOnline})
            }

           _this.setState({ip: response.ip})

        });

     },

    render: function() {

        var inlineStyle = {
            padding: '2px 10px'
        };


        var cx = React.addons.classSet;
        var classes = cx({
            'ion-ios7-circle-outline': true,
            'purple': true,
            'green': this.state.isOnline
        });

        return (
            <span>
                <span className="muted well online" data-location={this.state.ip} style={inlineStyle}><strong><i className={classes}></i></strong> {this.state.isOnline ? "Online" : "Offline"}</span> 
            </span>
            )
    }
});