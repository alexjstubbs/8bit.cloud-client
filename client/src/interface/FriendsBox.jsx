/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
            navable: true,
            navStack: 1,
            icon: "ion-person-stalker ",
            friendsOnline: 0,
            shortcutKey: "F5",
            functionCall: "viewFriends",
            classString: 'col-md-3 pull-left square dark-gray',
            id: "friendsBox"
        }
    },
    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'gray': true,
            'navable': false,
            'dark-gray': this.props.friendsOnline,
        });
        return (
    
        <div id={this.props.id} className="col-md-6 pull-right">

            <div className={this.props.navable ? 'navable '+this.props.classString : this.props.classString} data-function={this.props.functionCall}>
                <i className={this.props.icon + classes}></i>
            </div>
            
            <div className="hello col-md-7 pad_h_5">
                <h4 className="nopadding">{this.props.friendsOnline ? this.props.friendsOnline : "No"} Friends Online</h4>
                <span className="muted">Press {this.props.shortcutKey} to view</span>
            </div>

        </div>

        );
    }
});



