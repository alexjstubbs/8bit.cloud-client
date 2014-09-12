/**
 * @jsx React.DOM
 */

/* TODO: Get event listener to update state correctly on newly stored games.
-------------------------------------------------- */

'use strict';

var React = require('react/addons'),
    api = require('socket.io-client')('/api'),
    _ = require('lodash');

module.exports = React.createClass({

   getInitialState: function() {
          return {
            "achieved": false
        };
    },

    getDefaultProps: function() {
            return {
               "title": "Hello World!",
               "description": "Collect your first mushroom",
            }
    },
    
    render: function() {
      
        return (

            <li className='col-md-3'>
               
               <div className="col-md-4 pull-left trophy-icon">
                  
                  <span className='trophy'>

                     <i className='icon base achieved fa fa-trophy'></i>

                  <span className="fa-stack sub fa-lg">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                  </span>

                  </span>

               </div>
               
               <span className='pull-right col-md-8 offset-md-2 trophy-info'>
           
                  <h5 className='achievement-title no-padding no-margin'>{this.props.title}</h5>
                  <span className='achievement-description'>{this.props.description}</span>
           
               </span>
           
            </li>

      )
    }
});