/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   WizardHeader    = require('./WizardHeader.jsx')
,   WifiAdvanced    = require('../forms/WifiAdvancedSetup.jsx');

module.exports = React.createClass({

    render: function() {

        return (

         <div className="container parent" id="new-profile">

                <WizardHeader title="Welcome" icon="ion-wrench" subtitle="Wifi Setup" active="1" steps="4" />

                    <div className="welcome-newprofile col-sm-12">

                        <WifiAdvanced />

                    </div>

                  

              
          </div>
        );
    }
});