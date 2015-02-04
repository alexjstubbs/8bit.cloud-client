/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    _               = require('lodash'),
    newMessages,
    icon            = "ion-email ";

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
            navable: true,
            navStack: 0,
            myMessages: [],
            newMessages: false,
            messageCount: 0,
            shortcutKey: "F9",
            functionCall: "viewMessages",
            classString: "col-xs-3 pull-left square dark-gray",
            id: "inbox",
            unread: null
        };
    },
    render: function() {

        newMessages = this.props.myMessages.length;

        if (this.props.unread > 0) {
            icon = "ion-email-unread ";
        }

        var cx = React.addons.classSet;
        var classes = cx({
            'gray': true,
            'red': this.props.unread
        });

        return (
        <div id={this.props.id} className="col-xs-6 pull-left">
            <div className={this.props.navable ? 'navable navable-row '+this.props.classString : this.props.classString} data-function={this.props.functionCall} data-parameters={this.props.myMessages}>
                <i className={icon + classes}></i>
            </div>
            <div className="hello col-xs-7 pad_h_5">
                <h4 className="nopadding">{this.props.unread ? this.props.unread + " New messages" : "Messages"}</h4>
                <span className="muted">Press {this.props.shortcutKey} to read</span>
            </div>
        </div>

        );
    }
});
