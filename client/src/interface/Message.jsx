/**
* @jsx React.DOM
*/

var React           = require('react/addons')
,   _               = require('lodash')
,   NetworkStatus   = require('./NetworkStatus.jsx')
,   navigationInit  = require('../js/navigation.init')
,   UserAvatar      = require('./Avatar.jsx');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            message: null
        }
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    getDefaultProps: function() {

        return {
            navable: true,
            navStack: 2,
            From: null,
            Avatar: <div className="col-md-3 pull-left square dark-gray"><i className='ion-person'></i></div>,
            Body: "No Content",
            messageId: null,
            Type: "Message"
        }
    },

    render: function() {

        var message = JSON.parse(this.props.message);
        return (

            <div className="parent">

                <div className="col-xs-12">

                    <div className="col-xs-2">
                        <UserAvatar username={message.From} />
                    </div>

                    <div className="col-xs-6">

                        <h3 className="mute no-padding">{message.From}</h3>
                        <h5 className="mute">{message.Timestamp}</h5>
                        <br />

                    </div>

                    <div className="col-xs-4 text-right">
                        <h2><i className="ion-ios-chatboxes-outline"></i> &nbsp; Message</h2>
                    </div>


                    <div className="clearfix"></div>

                    <div className="well-alt coll-xs-12 navable scrollable">
                        {message.Body}
                    </div>
                </div>

                <div className="clearfix"></div>

                <hr />

                <div className="pull-left">
                    <button className="navable btn btn-alt btn-alt-size" data-function="closeDialog"><i className="ion-close red"></i> &nbsp; Close Message</button>
                </div>

                <div className="pull-right">
                    <button className="navable btn btn-alt btn-alt-size"><i className="ion-trash-a red"></i> &nbsp; Delete Message</button>
                    <button className="navable btn btn-alt btn-alt-size" data-function="passMessage" data-parameters={message.From}><i className="ion-reply green"></i> &nbsp; Reply</button>
                </div>
            </div>

        );
    }
});
