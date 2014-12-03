/**
 * @jsx React.DOM
 */

'use strict';

var React     = require('react/addons')
,   events    = require('../../js/system.events').events;     

module.exports = React.createClass({

    getDefaultProps: function() {

        return {
            layout: 'controller-ui.png',
            screen: "LoadingIgnition"
          }
    },

    screenMount: function() {
      // Load Dashboard
      events.preloadDashboard();
    },

    componentDidMount: function() {

        var _this = this;

        window.addEventListener("mountView", function(e) { 

          if (e.detail.screen == _this.props.screen) {
              _this.screenMount();
          };
        });

        window.addEventListener("changeView", function(e) { 
              _this.changeView(e.detail.view);
        });

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