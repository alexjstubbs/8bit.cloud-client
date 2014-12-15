/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   api             = require('socket.io-client')('/api')
,    _              = require('lodash')
,   Profile         = require('./Profile.jsx')
,   navigationInit  = require('../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
        profiles: [
                  {}
                ]
        }
    },

    componentDidMount: function() {

        api.emit('request', { request: 'profileList'});

        api.on('api', this.setProps.bind(this));

    },


    render: function() {

        var num = this.props.profiles.length;

        var profileNodes = this.props.profiles.map(function (profile, i) {
            return <Profile username={profile.username} />
        });

        return (
      
            <div className="parent">

                <ul id="profile-list" className="scroll-into-view">   
                    <li className="no-show"> &nbsp; &nbsp; </li>  

                        {profileNodes}

                     <li className="no-show"> &nbsp; &nbsp; </li>  
                </ul>

            </div>

        );
    }
});