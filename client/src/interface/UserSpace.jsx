/**
 * @jsx React.DOM
 */

'use strict';

var React               = require('react/addons'),
    _                   = require('lodash'),
    Avatar              = require('./Avatar.jsx'),
    api                 = require('socket.io-client')('/api'),
    mixins              = require('./mixins/mixins.jsx'),
    NetworkStatus       = require('./NetworkStatus.jsx'),
    Timer               = require('./Timer.jsx');

/* Components
-------------------------------------------------- */
module.exports = React.createClass({

    mixins: [mixins.listener],

    getInitialState: function() {
        return {
            session: {
                Username: "Guest"
            }
        };
    },

    componentDidMount: function() {
        api.emit('request', { request: 'getSession'} );
    },

    getDefaultProps: function() {
        return {

            id: "userspace",
            achievementtotals: 0,
            achieved: 0

        };
    },

    render: function() {

        return (

            <div id={this.props.id}>
                <div clasName="user-space-left container">

                        <Avatar Username={this.state.session.Username} />

                        <div className="badge-player-number">1</div>

                        <div className="clearfix"></div>


                    <hr />


                        <div className="user-space-player col-xs-12">

                            <div className="col-xs-8 text-left">
                                {this.state.session.Username}
                            </div>

                            <div className="col-xs-2">
                                <i className="ion-android-microphone-off"></i>
                            </div>

                        </div>

                        <div className="clearfix"></div>

                        <hr />

                        <div className="gold-user-space-block col-xs-3">
                            <i className="ion-trophy"></i>
                        </div>

                        <div className="col-xs-9 user-space-count">
                            {this.props.achieved}/{this.props.achievementtotals}
                        </div>

                        <div className="clearfix"></div>

                        <div className="purple-user-space-block col-xs-3">
                            <i className="ion-ios-videocam-outline"></i>
                        </div>

                        <div className="col-xs-9 user-space-count">
                            <span className="mute">off</span>
                        </div>

                        <div className="clearfix"></div>

                        <div className="red-user-space-block col-xs-3">
                            <i className="ion-android-stopwatch"></i>
                        </div>

                        <div className="col-xs-9 user-space-count">
                            <span className="mute">off</span>
                        </div>

                        <div className="user-space-bottom">

                        </div>
                </div>

            </div>

        )
    }
});
