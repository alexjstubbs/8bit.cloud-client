/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   _               = require('lodash')
,   NetworkStatus   = require('./NetworkStatus.jsx')
,   navigationInit      = require('../js/navigation.init');

module.exports = React.createClass({

    getInitialState: function() {
            return {
                friends: []
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
            Type: "Message"
        }
    },

    render: function() {

        var messageObj = JSON.stringify(this.props.message);

        return (

            <div className="navable message-preview message-unread" data-function="viewMessage" data-parameters={messageObj}>

                <div className="col-xs-1">

                    <small className='timestamp'><span className="label label-info">{this.props.From}</span></small>
                </div>

                <div className="col-xs-8">
                    <p className="preview">{this.props.Body}</p>
                </div>

                <div className="col-xs-3">

                    <p className="timestamp">{this.props.timestamp}</p>

                </div>

                <div className="clearfix"></div>

                <br />


            </div>

        );
    }
});
