/**
 * @jsx React.DOM
 */

var React               = require('react/addons'),
    _                   = require('lodash'),
    moment              = require('moment'),
    MessagePreview      = require('./MessagePreview.jsx'),
    api                 = require('socket.io-client')('/api'),
    navigationInit      = require('../js/navigation.init'),
    UserAvatar          = require('./Avatar.jsx'),
    Avatar,
    noMessages,
    noMsg;


module.exports = React.createClass({


    getInitialState: function() {
        return {
            messages: []
        };
    },

    componentDidMount: function () {

        var _this = this;

        api.emit('request', { request: 'messages'});

        api.on('network-api', function(data) {

            if (data.messages) {
                _this.setState(data);
                _this.forceUpdate();
                navigationInit.navigationInit();
            }

        });


        navigationInit.navigationInit();
    },

    getDefaultProps: function() {

    return {
            navable: true
        };
    },

    render: function() {

        noMsg = true;

        if (this.state.messages.length !== 0) {
            noMsg = false;
        }

        var messageNodes = this.state.messages.map(function (message, i) {
          return <MessagePreview key={i.id} Avatar={message.Avatar} message={message} messageId={message._id} From={message.From} Body={message.Body} timestamp={moment(message.timestamp, "YYYYMMDDhhmms").fromNow()} />
        });

        messageNodes.reverse();

        return (

            <div className="parent">

                <div className="messages-list scroll-into-view">

                    {messageNodes}


                </div>


                { noMsg ? <div className="well"><h3 className="text-center"><i className="ion-sad"></i> &nbsp; You have no messages</h3></div> : null }


                <hr />

                <span className="pull-left">
                    <button className="navable btn btn-alt btn-alt-size" data-function="closeDialog">
                    <i className='ion-close red'></i> &nbsp; Close Window</button>
                </span>

                <span className="pull-right">
                    <button className="navable btn btn-alt btn-alt-size" data-function="passMessage">
                    <i className='ion-email-unread green'></i> &nbsp; New Message</button>
                </span>

            </div>

        );
    }
});
