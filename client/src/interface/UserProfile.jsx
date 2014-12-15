/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var UserAvatar = require('./Avatar.jsx');
var NetworkStatus = require('./NetworkStatus.jsx');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            session: {
                Username: "Guest"
            }
        }
    },

    getDefaultProps: function() {

    return {
            avatar: <i className="ion-person"></i>,
            username: 'user',
            isOnline: false,
            id: "avatar"
        }
    },

    componentDidMount: function() {

        api.emit('request', { request: 'getSession'} );
        api.on('api', this.setState.bind(this));
    
    },


    render: function() {
        return (
            <div id={this.props.id}>
            <UserAvatar avatar={this.props.avatar} username={this.state.session.Username} isOnline={this.props.isOnline} />
            </div>
        );
    }
});