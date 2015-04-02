/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    _               = require('lodash'),
    api             = require('socket.io-client')('/api'),
    onlineFriends,
    plural;

module.exports = React.createClass({

    getInitialState: function() {
        return {
            onlineFriends: 0
        };
    },

    getDefaultProps: function() {
    return {
            navable: true,
            navStack: 1,
            icon: "ion-person-stalker ",
            friendsOnline: 0,
            shortcutKey: <span>&circ;F</span>,
            functionCall: "viewFriends",
            classString: 'col-xs-3 pull-left square dark-gray',
            id: "friendsBox"
        };
    },


    componentDidMount: function() {

        var _this = this;

        api.emit('request', { request: 'getFriends'});

        api.on('network-api', function(data) {

            if (data.friends) {
                _this.setState(data);

                var _friends  = _.compact(_.flatten(data.friends, 'Online'));
                var _online   = _.remove(_friends, function(obj) { return obj.Online; });
                onlineFriends = _online.length

                _this.forceUpdate();
            }


        });

    },


    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'gray': true,
            'navable': false,
            'purple': onlineFriends,
        });

        if (onlineFriends > 1) { plural = "Friends"; }
        else { plural = "Friend"; }

        return (

        <div id={this.props.id} className="col-xs-6 pull-right">

            <div className={this.props.navable ? 'navable '+this.props.classString : this.props.classString} data-function={this.props.functionCall}>
                <i className={this.props.icon + classes}></i>
            </div>

            <div className="hello col-xs-7 pad_h_5">
                <h4 className="nopadding">{onlineFriends ? onlineFriends : "No"} {plural} Online</h4>
                <span className="muted">Press {this.props.shortcutKey} to view</span>
            </div>

        </div>

        );
    }
});
