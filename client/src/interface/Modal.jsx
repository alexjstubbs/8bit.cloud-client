/**
 * @jsx React.DOM
 */

'use strict';

var React               = require('react/addons'),
    Backdrop            = require('./Backdrop.jsx'),
    OnScreenKeyboard    = require('./OnScreenKeyboard.jsx'),
    navigationInit      = require('../js/navigation.init'),
    _                   = require('lodash');


module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: false,
            backdrop: false,
            classList: "container ignition-modal systemNotificationContent",
            children: [],
            input: null,
            columns: "col-xs-12"
        };
    },

    componentDidMount: function() {

        // RPI1: Skip

        
        // if (this.props.backdrop) {
        //
        //     var main = document.getElementById("main");
        //     main.classList.add("opacity-50");
        //
        //     var modals = document.getElementsByClassName("ignition-modal-parent");
        //     _(modals).forEach(function(el) {
        //         el.classList.add("opacity-0");
        //     }).value();
        //
        //     _.first(modals).classList.remove("opacity-0");
        //
        // }

        navigationInit.navigationInit();
    },

    render: function() {


        return (

            <div>

                <div className={this.props.classList} id={this.props.id}>
                    {this.props.children}
                </div>

            </div>
        );
    }
});
