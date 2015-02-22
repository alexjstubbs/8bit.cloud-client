/**
 * @jsx React.DOM
 */

/* TODO: Get event listener to update state correctly on newly stored games.
-------------------------------------------------- */

'use strict';

var React   = require('react/addons'),
    api     = require('socket.io-client')('/api'),
    _       = require('lodash');

module.exports = React.createClass({

   getInitialState: function() {
          return {
            "achieved": true
        };
    },

    getDefaultProps: function() {
            return {
               "title": "",
               "description": "",
               "achievedClass": "fa-stack sub fa-lg "
           };
    },

    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'achieved': this.state.achieved,
            'icon': true,
            'base': true,
            'fa': true,
            'fa-trophy': true
        });


        return (

            <li className='col-xs-3 achievement-navable-wrapper navable'>

               <div className="col-xs-4 pull-left trophy-icon">

                  <span className='trophy'>

                     <i className={classes}></i>


                  <span className={this.state.achieved ? this.props.achievedClass : "hidden"}>
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                  </span>

                  </span>

               </div>

               <span className='pull-right col-xs-8 offset-md-2 trophy-info'>

                  <h5 className='achievement-title no-padding no-margin'>{this.props.title}</h5>
                  <span className='achievement-description'>{this.props.description}</span>

               </span>

            </li>

      )
    }
});
