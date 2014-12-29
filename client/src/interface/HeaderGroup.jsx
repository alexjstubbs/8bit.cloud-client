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
            classString: "col-md-6 pull-right",
            myMessages: [],
            unread: null

        }
    },
    render: function() {

        console.log(this.props.unread);

        return (
            <div className={this.props.classString}>
                <Inbox myMessages={this.props.myMessages} unread={this.props.unread}/>
                <FriendsBox  />
            </div>
        );
    }
});
