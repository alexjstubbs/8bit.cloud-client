/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var UserAvatar = require('./Avatar.jsx');
var NetworkStatus = require('./NetworkStatus.jsx');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            avatar: <i className="ion-person"></i>,
            username: 'user',
            isOnline: false,
            id: "avatar"
        }
    },
    render: function() {
        return (
            <div id={this.props.id}>
            <UserAvatar avatar={this.props.avatar} username={this.props.username} isOnline={this.props.isOnline} />
            </div>
        );
    }
});