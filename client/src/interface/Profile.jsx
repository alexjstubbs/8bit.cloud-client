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
                 
            <li className="navable user-profile-card" data-function="logIn" data-parameters={this.props.username}>
                <i className='ion-person'></i>
                <h1>{this.props.username}</h1>
            </li>
        )
    }
});