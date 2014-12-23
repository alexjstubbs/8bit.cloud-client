/**
 * @jsx React.DOM
 */

'use strict';

var React   = require('react/addons')
,   _       = require('lodash')
,   navigationInit = require('../js/navigation.init');

module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: false,
            subNavable: true,
            username: null
        }
    },

    componentDidMount: function() {
         navigationInit.navigationInit();
    },

    render: function() {
        return (

            <li className="navable user-profile-card muted" data-function="logIn" data-parameters={this.props.username}>

                <div className="profiles-avatar col-xs-5">
                    <i className='ion-ios-game-controller-b-outline'></i>
                </div>

                <ul className="col-xs-7">
                    <li><h1>{this.props.username}</h1></li>
                    <li><span className="mute">Last Seen:</span> Yesterday</li>
                    <li><span className="mute">Playtime:</span> 12 hours</li>
                </ul>

            </li>
        )
    }
});
