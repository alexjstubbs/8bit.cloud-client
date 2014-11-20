/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   WizardHeader    = require('./WizardHeader.jsx')
,   WifiSetup       = require('../forms/WifiSetup.jsx');

module.exports = React.createClass({

    render: function() {

        return (

         <div className="container parent" id="new-profile">

                <WizardHeader title="Welcome" icon="ion-wrench" subtitle="Wifi Setup" active="1" steps="4" />

                    <div className="welcome-newprofile col-sm-6">

                        <WifiSetup />

                    </div>

                    <div className="col-sm-1"></div>

                    <div className="col-sm-5">
                    
                        <img id="wifi-config-img" src="/src/img/wifi-config.png" alt="Wifi Configuration" className="img-responsive img-center" />
               
                    </div>


              
          </div>
        );
    }
});