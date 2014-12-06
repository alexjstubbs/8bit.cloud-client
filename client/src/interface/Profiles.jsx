/**
 * @jsx React.DOM
 */

'use strict';

var React   = require('react/addons')
,   api     = require('socket.io-client')('/api')
,    _      = require('lodash');

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
            profiles: [
                
            ]
        }
    },

    componentDidMount: function() {

    },

    render: function() {

        return (
      
            <div className="parent">

                <ul id="profile-list" className=" scroll-into-view">   

                    <li className="navable user-profile-card"><i className='ion-log-in'></i></li>
                    <li className="navable user-profile-card">User 2</li>

                </ul>

            </div>

        );
    }
});