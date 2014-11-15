/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   WizardHeader    = require('./WizardHeader.jsx')
,   Signup          = require('../forms/Signup.jsx');

module.exports = React.createClass({

    componentDidMount: function() {
       
    },

    getDefaultProps: function() {
    },

    render: function() {

        return (

         <div className="container parent" id="new-profile">

                <WizardHeader title="Welcome" icon="ion-person-add" subtitle="Your Profile" active="2" steps="4" />

                    <div className="welcome-newprofile col-sm-6">

                        <Signup />

                    </div>

                    <div className="col-sm-6">
                      <div id="KB"></div> 
                    </div>


              
          </div>
        );
    }
});