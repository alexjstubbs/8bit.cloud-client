/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    newMessages;

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
            navable: true,
            navStack: 0,
            icon: "ion-ios7-email-outline ",
            myMessages: [],
            newMessages: false,
            messageCount: 0,
            shortcutKey: "F9",
            functionCall: "viewMessages",
            classString: "col-md-3 pull-left square dark-gray",
            id: "inbox"
        }
    },
    render: function() {

        newMessages = this.props.newMessages;

        if (this.props.myMessages.length > 0) { 
            newMessages = true 
        }

        var cx = React.addons.classSet;
        var classes = cx({
            'gray': true,
            'red': newMessages
        });

        return (
        <div id={this.props.id} className="col-md-6 pull-left">
            <div className={this.props.navable ? 'navable '+this.props.classString : this.props.classString} data-function={this.props.functionCall} data-parameters={this.props.myMessages}>
                <i className={this.props.icon + classes}></i>
            </div>
            <div className="hello col-md-7 pad_h_5">
                <h4 className="nopadding">{this.props.myMessages.length} {newMessages ? "New messages" : "Messages"}</h4>
                <span className="muted">Press {this.props.shortcutKey} to read</span>
            </div>
        </div>

        );
    }
});



