/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    api = require('socket.io-client')('/api');

module.exports = React.createClass({
    
    getInitialState: function() {
        return {
            isOnline: false
        };
    },

    componentDidMount: function () {

        var _this = this;
        var user = this.props.username;
        api.emit('request', { request: 'isOnline', param: this.props.username});
        
        api.on('api', function(response) {
    
            if (response.username == user) { 
                _this.setState({isOnline: response.isOnline})
            }

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
                <span className="muted well online" style={inlineStyle}><strong><i className={classes}></i></strong> {this.state.isOnline ? "Online" : "Offline"}</span> 
            </span>
            )
    }
});