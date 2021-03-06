/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   api             = require('socket.io-client')('/api')
,   WizardHeader    = require('./WizardHeader.jsx');

module.exports = React.createClass({

    componentDidMount: function() {

        document.getElementById("main").setAttribute("data-screen", "Welcome");

       var controllerImg    = document.getElementById("controller-ui")
       ,   keyboardImg      = document.getElementById("keyboard-ui");

      sessionStorage.setItem("navigationState", "");

    },

    getDefaultProps: function() {
        layout: 'controller-ui.png'
    },

    render: function() {

        return (

            <div className="container parent viewport-container" id="welcome">

                <WizardHeader title="Welcome" icon="ion-ios-game-controller-b" subtitle="Controlling the UI" active="0" steps="4" />

                <div id="crossfade" className='viewport-60'>

                <img id="controller-ui" src="/src/img/controller-ui.png" alt="Controller Layout" className="top img-responsive img-center" />
                <img id="keyboard-ui" src="/src/img/keyboard-ui.png" alt="Controller Layout" className="bottom img-responsive img-center" />

                </div>

                <br /><br />

                <button data-function='nextScreen' data-parameters='' className="navable btn btn-lg btn-alt pull-right">Continue &nbsp; <i className="ion-ios-arrow-forward"></i></button>

            </div>

        );
    }
});
