/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    UserAvatar      = require('./Avatar.jsx'),
    NetworkStatus   = require('./NetworkStatus.jsx'),
    api             = require('socket.io-client')('/api');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            session: {
                Username: "Guest"
            }
        };
    },

    getDefaultProps: function() {

    return {
            id: "avatar"
        };
    },

    componentDidMount: function() {

        var _this = this;

        api.emit('request', { request: 'getSession'} );

        api.on('api', function(data) {

            if (data.session) {

                api.on('api', _this.setState.bind(_this));

            }

        });

    },


    render: function() {

        return (

            <div id={this.props.id}>
                <div>
                    <div className="col-xs-4">
                        <UserAvatar Username={this.state.session.Username} />

                        <div className="hello col-xs-8">
                            <h3 className="nopadding">Welcome, {this.state.session.Username} <span className="muted"></span></h3>
                            <NetworkStatus />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});
