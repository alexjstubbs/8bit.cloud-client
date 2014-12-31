/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   _               = require('lodash')
,   NetworkStatus   = require('./NetworkStatus.jsx')
,   navigationInit  = require('../js/navigation.init')
,   UserAvatar      = require('./Avatar.jsx')
,   moment          = require('moment');

module.exports = React.createClass({

    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    getDefaultProps: function() {

    return {
            From: null,
            Avatar: <div className="col-xs-3 pull-left square dark-gray"><i className='ion-person'></i></div>,
            Body: "No Content",
            Type: "Message"
        }
    },

    render: function() {

        var message = this.props.message,
        _moment  = moment(message.Timestamp, "YYYYMMDDhhmms").fromNow();

        var readMessages = localStorage.getItem("read_messages");
        var read = _.contains(readMessages, this.props.message._id);

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

        var parentClasses = cx({
            'navable': true,
            'message-preview': true,
            'message-read': read
        });

        return (

            <div className={parentClasses} data-function="viewMessage" data-parameters={messageObj}>

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

                    <p className="timestamp">{_moment}</p>


                </div>

                <div className="clearfix"></div>

                <br />


            </div>

        );
    }
});
