/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   WizardHeader    = require('./WizardHeader.jsx');

module.exports = React.createClass({

    getDefaultProps: function() {

    },

    render: function() {

        return (
      
            <div className="container parent" id="network-settings">

                <WizardHeader title="Welcome" icon="ion-wifi" subtitle="Network Setup" active="1" steps="4" />


                <button className="navable btn btn-block btn-lg btn-alt">CONTINUE AGAIN</button>

            </div>

        );
    }
});