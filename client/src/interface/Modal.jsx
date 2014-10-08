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
            classList: "ignition-modal systemNotificationContent",
            children: [],
            id: "ignition-modal"
        }
    },
    
    componentDidMount: function() {

        var modal = document.getElementById("ignition-modal");
        // var animate = TweenLite.to(modal, .6, {top:"10%"});

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



