/**
* @jsx React.DOM
*/

var React           = require('react/addons'),
    _               = require('lodash'),
    UserStatus      = require('./UserStatus.jsx'),
    navigationInit  = require('../js/navigation.init'),
    UserAvatar      = require('./Avatar.jsx');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            friends: []
        };
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    getDefaultProps: function() {

        return {
            Avatar: <div className="col-xs-3 pull-left square dark-gray"><i className='ion-person'></i></div>,
            functionCall: "viewFriend"
        }
    },

    render: function() {

        var friendObj = JSON.stringify(this.props.friend);

        var Avatar;

        Avatar = true;

        if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.props.Avatar)) {
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
            'message-preview': true
        });



        return (


            <div className={parentClasses} data-function={this.props.functionCall} data-parameters={friendObj}>

            <div className="col-xs-1">
                <div className={classes}>
                    {Avatar ? <img src={this.props.Avatar} className='img-responsive' /> : <i className='ion-person'></i>}
                </div>
            </div>

            <div className="col-xs-6">
                <div>{this.props.Username}</div>
                <small><UserStatus Username={this.props.Username} /></small>
            </div>

            <div className="col-xs-5">

            <p className="timestamp">Last seen {this.props.LastSeen}</p>


            </div>

            <div className="clearfix"></div>

            <br />

            </div>

        );
    }
});
