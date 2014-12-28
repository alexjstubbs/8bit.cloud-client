/**
 * @jsx React.DOM
 */

var React               = require('react/addons')
,   _                   = require('lodash')
,   moment              = require('moment')
,   MessagePreview      = require('./MessagePreview.jsx')
,   api                 = require('socket.io-client')('/api')
,   navigationInit      = require('../js/navigation.init');


module.exports = React.createClass({


    getInitialState: function() {
        return {
            messages: []
        }
    },

    componentDidMount: function () {
        api.emit('request', { request: 'messages'});
        api.on('network-api', this.setState.bind(this));

     },

    getDefaultProps: function() {

    return {
            navable: true
        }
    },

    render: function() {

        var messageNodes = this.state.messages.map(function (message, i) {
          return <MessagePreview key={i.id} message={message} messageId={message._id} From={message.From} Body={message.Body} timestamp={moment(message.timestamp, "YYYYMMDDhhmms").fromNow()} />
        });

        return (

            <div className="parent">

                <div className="messages-list scroll-into-view">
                    &nbsp; {messageNodes} &nbsp;
                </div>

                <hr />

                <span className="pull-left">
                    <button className="navable btn btn-alt btn-alt-size" data-function="closeDialog">
                    <i className='ion-close red'></i> &nbsp; Close Window</button>
                </span>

                <span className="pull-right">
                    <button className="navable btn btn-alt btn-alt-size" data-function="passMessage">
                    <i className='ion-paper-airplane green'></i> &nbsp; New Message</button>
                </span>

            </div>

        );
    }
});
