/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    Backdrop = require('./Backdrop.jsx');
    // cssplugin = require('../components/greensock/plugins/CSSPlugin.min.js'),
    // EasePack = require('../components/greensock/easing/EasePack.min.js'),
    // TweenLite = require('../components/greensock/TweenLite.js');


module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: false,
            backdrop: true,
            classList: "container ignition-modal systemNotificationContent col-xs-1",
            children: [],
            input: null,
            id: "ignition-modal",
            columns: "col-xs-12"
        }
    },
    
    componentDidMount: function() {

    },

    render: function() {

        var backdrop;

        if (this.props.backdrop) {
            backdrop = <Backdrop /> 
        }

        return (

            <div>

                {backdrop}

                <div className={this.props.classList} id={this.props.id}>
                    {this.props.children}
                </div>

            </div>
        );
    }
});



