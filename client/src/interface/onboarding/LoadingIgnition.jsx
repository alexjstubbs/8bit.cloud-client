/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   WizardHeader    = require('./WizardHeader.jsx');

module.exports = React.createClass({

    componentDidMount: function() {
       

    },

    getDefaultProps: function() {
        layout: 'controller-ui.png'
    },

    render: function() {

        return (
      
            <div className="container parent viewport-container" id="welcome">

                <div className='viewport-60'>


                      <div className='loading-container'>
                        <i className='fa-rocket'></i>

                          <div className='ignition-circle'></div>
                          <div className='ignition-circle'></div>
                          <div className='ignition-circle'></div>

                

                        </div>
                        

                          <h1 className="text-center blink">Loading Dashboard...</h1>

                          <span className="hidden navable"></span>
               
                </div>

            </div>

        );
    }
});