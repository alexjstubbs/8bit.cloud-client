/**
* @jsx React.DOM
*/

var React           = require('react/addons')
,   _               = require('lodash')
,   NetworkStatus   = require('./NetworkStatus.jsx')
,   navigationInit  = require('../js/navigation.init')
,   UserAvatar      = require('./Avatar.jsx')
,   UserStatus      = require('./UserStatus.jsx')
,   moment          = require('moment');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            message: null
        }
    },

    componentDidMount: function() {

            var readItems = [];

            readItems.push(localStorage.getItem("read_messages"));
            readItems.push(JSON.parse(this.props.message)._id);

            localStorage.setItem("read_messages", _.compact(_.uniq(readItems)));


        navigationInit.navigationInit();

    },

    getDefaultProps: function() {

        return {
            navable: true,
            navStack: 2,
            From: null,
            Avatar: <div className="col-xs-3 pull-left square dark-gray"><i className='ion-person'></i></div>,
            Body: "No Content",
            messageId: null,
            Type: "Message"
        }
    },

    render: function() {


        var message = JSON.parse(this.props.message),
            _moment  = moment(message.Timestamp, "YYYYMMDDhhmms").fromNow();

        return (

            <div className="parent">

                <div className="col-xs-12" className="full-message">

                    <div className="col-xs-1">
                        <UserAvatar username={message.From} />
                    </div>

                    <div className="col-xs-6">

                        <div className="no-padding no-margin">{message.From}</div><br />
                        <div className="mute down5">sent {_moment}</div>

                        <UserStatus Username={message.From} />
                        <br />

                    </div>

                    <div className="col-xs-5 text-right">
                        <h2><i className="ion-ios-chatboxes-outline"></i> &nbsp; Message</h2>
                    </div>


                    <div className="clearfix"></div>

                    <br />

                    <div className="well-alt coll-xs-12 scrollable">
                        {message.Body}
                    </div>
                </div>

                <div className="clearfix"></div>

                <hr />

                <div className="pull-left">
                    <button className="navable btn btn-alt btn-alt-size" data-function="closeDialog"><i className="ion-close red"></i> &nbsp; Close Message</button>
                </div>

                <div className="pull-right">
                    <button className="navable btn btn-alt btn-alt-size" data-function="deleteMessage" data-parameters={message._id}><i className="ion-trash-a red"></i> &nbsp; Delete Message</button>
                    <button className="navable btn btn-alt btn-alt-size" data-function="passMessage" data-parameters={message.From}><i className="ion-reply green"></i> &nbsp; Reply</button>
                </div>
            </div>

        );
    }
});
