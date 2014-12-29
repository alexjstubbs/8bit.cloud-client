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

        var Avatar;

        Avatar = true;

        if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.props.message.Avatar)) {
            Avatar = true
        }

        else {
            Avatar = false;
        }

        var cx = React.addons.classSet;
        var classes = cx({
            'avatared': Avatar,
            'square': true,
            'pull-left': true
        });

        return (

            <div className="navable message-preview message-unread" data-function="viewMessage" data-parameters={messageObj}>

                <div className="col-xs-2">
                    <div className={classes}>
                        {Avatar ? <img src={this.props.message.Avatar} className='img-responsive' /> : <i className='ion-person'></i>}
                    </div>
                </div>

                <div className="col-xs-7">
                <p>
                    {this.props.From}
                    <br />
                    {this.props.Body}
                </p>
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
