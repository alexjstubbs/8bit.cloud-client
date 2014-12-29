/**
* @jsx React.DOM
*/

var React               = require('react/addons')
,   _                   = require('lodash')
,   moment              = require('moment')
,   FriendNode          = require('./Friend.jsx')
,   api                 = require('socket.io-client')('/api')
,   navigationInit      = require('../js/navigation.init')
,   UserAvatar          = require('./Avatar.jsx')
,   Avatar
,   noFriends           // You poor sucker
,   noFriendsOnline
,   hasFriends;

module.exports = React.createClass({


    getInitialState: function() {
        return {
            friends: []
        }
    },

    componentDidMount: function () {

        var _this = this;

        api.emit('request', { request: 'getFriends'});

        api.on('network-api', function(data) {

            if (data.friends) {
                _this.setState(data);
                _this.forceUpdate();
                navigationInit.navigationInit();
            }

        });

        navigationInit.navigationInit();

        noFriends = '<i classname="ion-sad-outline"> &nbsp; You currently have no Friends. Add a friend below!';

    },

    getDefaultProps: function() {

        return {
            navable: true
        }
    },

    render: function() {


        if (this.state.friends.length > 0) {
            hasFriends = true;
        }

        else {
            hasFriends = false;
        }

        console.log(hasFriends);

        var friendsNodes = this.state.friends.map(function (friend, i) {

            var time = moment(friend.LastSeen).format('YYYY-MM-DD hh:mm:ss');
                time = moment(time).fromNow();

                console.log(friend);

            return <FriendNode key={i.id} friend={friend} Username={friend.Username} Avatar={friend.Avatar} Playing={friend.Playing} Online={friend.Online} IP={friend.IP} LastSeen={time} />
        });

        friendsNodes.reverse();

        return (

            <div className="parent">

            <div className="messages-list scroll-into-view">

                {hasFriends ? null : <h3 className="text-center">{noFriends}</h3>}

                {friendsNodes}


            </div>

            <hr />

            <span className="pull-left">
                <button className="navable btn btn-alt btn-alt-size" data-function="closeDialog">
                <i className='ion-close red'></i> &nbsp; Close Window</button>
            </span>

            <span className="pull-right">
                <button className="navable btn btn-alt btn-alt-size" data-function="addFriend">
                <i className='ion-paper-airplane green'></i> &nbsp; Add Friend</button>
            </span>

            </div>

        );
    }
});
