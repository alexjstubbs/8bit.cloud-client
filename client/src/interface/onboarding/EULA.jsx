/**
 * @jsx React.DOM
 */

'use strict';

var React   = require('react/addons')
,   api             = require('socket.io-client')('/api')
,    _      = require('lodash');

module.exports = React.createClass({
    getDefaultProps: function() {
    return {

        }
    },

    componentDidMount: function() {

    },

    render: function() {

        return (

        <div>
            Controller Layout
        </div>

        );
    }
});
