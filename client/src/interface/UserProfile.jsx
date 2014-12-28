/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var UserAvatar = require('./Avatar.jsx');
var NetworkStatus = require('./NetworkStatus.jsx');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            session: {
                Username: "Guest"
            }
        }
    },

    getDefaultProps: function() {

    return {
            id: "avatar"
        }
    },

    componentDidMount: function() {

        api.emit('request', { request: 'getSession'} );

        api.on('api', this.setState.bind(this));

    },


    render: function() {

        return (

            <div id={this.props.id}>
                <div>
                    <div className="col-md-4">
                        <UserAvatar Username={this.state.session.Username} />

                        <div className="hello col-md-8">
                            <h3 className="nopadding">Welcome, {this.state.session.Username} <span className="muted"></span></h3>
                            <NetworkStatus />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});
