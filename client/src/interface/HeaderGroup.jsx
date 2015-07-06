/**
 * @jsx React.DOM
 */

 'use strict';

var React = require('react/addons'),
    Inbox = require('./Inbox.jsx'),
    FriendsBox = require('./FriendsBox.jsx');

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
            navable: false,
            classString: "col-xs-6 pull-right",
            myMessages: [],
            unread: null

        };
    },


    render: function() {

        return (
            <div className={this.props.classString}>
                <Inbox myMessages={this.props.myMessages} unread={this.props.unread}/>
                <FriendsBox  />
            </div>
        );
    }
});
