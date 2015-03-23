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
            shortcutKey: <span>&circ;M</span>,
            functionCall: "viewMessages",
            classString: "col-xs-3 pull-left square dark-gray",
            id: "inbox",
            unread: null
        };
    },
    render: function() {

        var newMessages  = this.props.myMessages.length,
            readMessages = localStorage.getItem("read_messages"),
            unread       = false;

        if (this.props.unread > 0 && this.props.unread > readMessages.split(",").length) {
            unread = true;
            icon = "ion-email-unread ";
        }

        var cx = React.addons.classSet;
        var classes = cx({
            'gray': true,
            'red': unread
        });

        return (
        <div id={this.props.id} className="col-xs-6 pull-left">
            <div className={this.props.navable ? 'navable navable-row '+this.props.classString : this.props.classString} data-function={this.props.functionCall} data-parameters={this.props.myMessages}>
                <i className={icon + classes}></i>
            </div>
            <div className="hello col-xs-7 pad_h_5">
                <h4 className="nopadding">{unread ? this.props.unread + " New messages" : "Messages"}</h4>
                <span className="muted">Press {this.props.shortcutKey} to read</span>
            </div>
        </div>

        );
    }
});
