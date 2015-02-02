/**
* @jsx React.DOM
*/

'use strict';

var React            = require('react/addons'),
    navigationInit   = require('../js/navigation.init'),
    io               = require('socket.io-client');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            url: "http://127.0.0.1:8080"
        };
    },

    componentDidMount: function() {


        navigationInit.navigationInit();
    },

    render: function() {

        return (
            <div className="parent">

                <iframe id={this.props.id} src={this.props.url} className="browser-frame" data-function="browserFocus" data-parameters={this.props.id}></iframe>

            </div>


        );
    }
});
