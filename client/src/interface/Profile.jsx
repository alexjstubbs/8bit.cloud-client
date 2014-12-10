/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash');


module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: false,
            subNavable: true,
            username: null
        }
    },

    render: function() {
        return (
                 
            <li className="navable user-profile-card">
                <i className='ion-person'></i>
                <h1>{this.props.username}</h1>
            </li>
        )
    }
});

