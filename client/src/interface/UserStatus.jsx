/**
 * @jsx React.DOM
 */

'use strict';

var React   = require('react/addons')
,   api     = require('socket.io-client')('/api')
,   _       = require('lodash')
,   profile;

module.exports = React.createClass({

    getInitialState: function() {
        return {

            profile: {
                IP: null,
                Online: false
            }

            // userProfile: [
            //     {Username: "Alex", IP: "0.0.0.0", Online: false, Friends: null, Activities: []},
            //     {Username: "Roman", IP: "0.2.0.0", Online: false, Friends: null, Activities: []}
            // ]

        };
    },

    getDefaultProps: function() {

            return {
                Username: "Alex"
            }

    },

    componentDidMount: function () {

        var _this = this;

        api.emit('request', { request: 'getProfile', param: this.props.Username});

        api.on('network-api', function(obj) {

            if (obj.userProfile[0].Username == _this.props.Username) {

                _this.setState({profile: obj.userProfile[0]});

            }

        });


     },


    render: function() {


        var cx = React.addons.classSet;
        var classes = cx({
            'ion-ios-circle-outline': true,
            'purple': true,
            'green': this.state.profile.Online
        });

        return (
            <span>
                <span className="muted well-small well-dark online" data-username={this.state.profile.Username} data-location={this.state.profile.IP}><strong><i className={classes}></i></strong> {this.state.profile.Online ? "Online" : "Offline"}</span>
            </span>
            )
    }
});
