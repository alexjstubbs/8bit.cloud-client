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


               <div className="loading-dashboard"></div>

                  <span className="hidden navable"></span>
               
                </div>

            </div>

        );
    }
});