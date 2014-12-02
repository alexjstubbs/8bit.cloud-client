/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   WizardHeader    = require('./WizardHeader.jsx')
,   WifiAdvanced    = require('../forms/WifiAdvancedSetup.jsx');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            child: true,
            parent: "NetworkSetup"
        }
    },

    render: function() {

        var cx = React.addons.classSet;

        var classes = cx({
            'child': this.props.child,
            'container': true,
            'parent': true
        });

        return (

         <div className={classes} id="new-profile" data-parent={this.props.parent}>

                <WizardHeader title="Welcome" icon="ion-wrench" subtitle="Wifi Configuration" active="1" steps="4" />

                    <div className="welcome-newprofile col-sm-12">

                        <WifiAdvanced />

                    </div>

          </div>
        );
    }
});