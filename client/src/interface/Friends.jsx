/**
* @jsx React.DOM
*/

var React          = require('react/addons'),
    _              = require('lodash'),
    moment         = require('moment'),
    FriendNode     = require('./Friend.jsx'),
    api            = require('socket.io-client')('/api'),
    navigationInit = require('../js/navigation.init'),
    UserAvatar     = require('./Avatar.jsx'),
    helpers        = require('../js/helpers'),
    Avatar,
    functionCall,
    noFriends;

module.exports = React.createClass({


    getInitialState: function() {
        return {
            friends: []
        };
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

    },

    getDefaultProps: function() {

        return {
            navable      : true,
            functionCall : "viewFriend",
            Invite       : null
        };

    },

    render: function() {

        functionCall = this.props.functionCall;

        if (this.props.Invite != "null") {
            functionCall = "sendInvite";
        }

        // if (this.props.Invite.hasOwnProperty(""))
        var noFriends_ = document.getElementById("noFriends");
        var component  = this;


        var friendsNodes = this.state.friends.map(function (friend, i) {


            var time = moment(friend.LastSeen).format('YYYY-MM-DD hh:mm:ss');
                time = moment(time).fromNow();



            return <FriendNode key={i.id} functionCall={functionCall} friend={friend} Username={friend.Username} Avatar={friend.Avatar} Playing={friend.Playing} Online={friend.Online} IP={friend.IP} LastSeen={time} />

        });

        friendsNodes.reverse();

        if (friendsNodes.length) {
            noFriends = "hidden text-center";
        }

        else {
            noFriends = "";
        }

        return (

            <div className="parent">

            <div className="messages-list scroll-into-view">


         <h3 id="noFriends" className={noFriends}><br /><i className="ion-sad"></i> &nbsp; You currently have no friends online<br /><br /></h3>

                {friendsNodes}

            </div>

            <hr />

            <span className="pull-left">
                <button className="navable navable-row btn btn-alt btn-alt-size" data-function="closeDialog">
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
