/**
* @jsx React.DOM
*/

var React           = require('react/addons'),
    _               = require('lodash'),
    NetworkStatus   = require('./NetworkStatus.jsx'),
    navigationInit  = require('../js/navigation.init'),
    UserAvatar      = require('./Avatar.jsx'),
    UserStatus      = require('./UserStatus.jsx'),
    api             = require('socket.io-client')('/api'),
    moment          = require('moment'),
    parsedLocation,
    throttled;

module.exports = React.createClass({

    getInitialState: function() {
            return {
                requestedIpLocation: null
            };
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

        api.on('api', this.setState.bind(this));

    },

    getLocation: function() {

        console.log(this.props.friend.IP);

        if (this.props.friend.IP) {
            api.emit('request', {request: 'ipLocation', param: this.props.friend.IP});
        }

        if (this.state.requestedIpLocation) {
            parsedLocation = this.state.requestedIpLocation.city + " " + this.state.requestedIpLocation.region + ", " + this.state.requestedIpLocation.country;
        }

    },

    getDefaultProps: function() {

        return {
            Avatar: <div className="col-xs-3 pull-left square dark-gray"><i className='ion-person'></i></div>,
            Location: <span className="mute">Somewhere on earth</span>
        }
    },

    componentWillUpdate: function() {
        console.log("wt");
        // this.getLocation();
    },

    render: function() {

        // throttled = _.throttle(this.getLocation, 3000);

        var friend = JSON.parse(this.props.friend),
            _moment  = moment(friend.LastSeen, "YYYYMMDDhhmms").fromNow();

        return (

            <div className="parent">

                <div className="col-xs-12" className="full-message">

                    <div className="col-xs-1">
                        <UserAvatar username={friend.Username} />
                    </div>

                    <div className="col-xs-7">

                        <h2 className="no-margin">{friend.Username}</h2>
                        {this.state.requestedIpLocation ? <h3><i className="ion-earth"></i> &nbsp; {parsedLocation}</h3> : <h3><i className="ion-earth mute"></i> &nbsp; {this.props.Location}</h3> }

                    </div>

                    <div className="col-xs-4 text-right">
                    <h2><UserStatus Username={friend.Username} /></h2>
                    </div>

                    <div className="clearfix"></div>

                    <hr />
                    <br />

                </div>

                <div className="clearfix"></div>

                <br />

                <div className="pull-left">
                    <button className="navable btn btn-alt btn-alt-size" data-function="closeDialog"><i className="ion-close red"></i> &nbsp; Close Window</button>
                    <button className="navable btn btn-alt btn-alt-size" data-function="removeFriend" data-parameters={friend._id}><i className="ion-sad red"></i> &nbsp; Remove Friend</button>

                </div>

                <div className="pull-right">
                        <button className="navable btn btn-alt btn-alt-size" data-function="gameInvite" data-parameters={friend}><i className="ion-ios-game-controller-a-outline green"></i> &nbsp; Game Invite</button>
                        <button className="navable btn btn-alt btn-alt-size" data-function="passMessage" data-parameters={friend.Username}><i className="ion-email green"></i> &nbsp; Send Message</button>
                </div>
            </div>

        );
    }
});
