/**
 * @jsx React.DOM
 */

var React = require('react/addons'),
    _ = require('lodash'),
    moment = require('moment'),
    MessagePreview = require('./MessagePreview.jsx'),
    api = require('socket.io-client')('/api');


module.exports = React.createClass({

    getInitialState: function() {
        return {
            messages: [
                { "type": "text", "sender": "Alexander Stubbs", "attachment": null, "timestamp": 2013121210230 },
                { "type": "text", "sender": "Romanania Stubbs", "attachment": null, "timestamp": 2012121210230 }
            ]
        };
    },

    componentDidMount: function () {   
        api.emit('request', { request: 'messages'});
        api.on('api', this.setState.bind(this));
     },

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2
        }
    },

    render: function() {

        var messageNodes = this.state.messages.map(function (message, i) {
          return <MessagePreview key={i.id} navStack={i+1} sender={message.sender} attachments={message.attachments} timestamp={moment(message.timestamp, "YYYYMMDDhhmms").fromNow()} />
        });

        return (

            <div>
                {messageNodes} 
            </div>              
         
        );
    }
});



