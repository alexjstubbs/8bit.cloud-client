/**
 * @jsx React.DOM
 */

'use strict';

var React     = require('react/addons')
,   events    = require('../../js/system.events').events;     

module.exports = React.createClass({

    getInitialState: function() {
        return {
            status: "Connecting to ignition server"
        }
    },

    getDefaultProps: function() {

        return {
            layout: 'controller-ui.png',
            screen: "LoadingIgnition",
          }
    },

    screenMount: function() {
      // Load Dashboard
      // events.preloadDashboard();

        var _this = this;
       
       setTimeout(function() {
          _this.setState({status: "Sending Profile Information"});
       }, 3000);
      
      setTimeout(function() {
          _this.setState({status: "Loading Dashboard"});
       }, 5000);
      
      setTimeout(function() {
           events.preloadDashboard();
       }, 6000);
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

               <div className='viewport-80'>

               <div className="loading-dashboard"></div>

                 <span className="status-info blink">
                     {this.state.status}
                 </span>

                  <span className="hidden navable"></span>
               
                </div>

            </div>

        );
    }
});