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
            "slot": 1
        };
    },

    componentDidMount: function () {

     },

    render: function() {

        return (

             <div className="col-xs-5 pull-left" id="profile-saves">
               <div className="row">
                  <div className="col-xs-4">
                     <a href="#">
                     <div className="no-screenshot save-slot navable"><i className='mute icon ion-ios-game-controller-b-outline'></i></div>
                     </a>
                     <div className='slot-number'>Slot 1</div>
                     06/27/2014 @ 5:58pm
                  </div>
                  <div className="col-xs-4">
                     <a href="#">
                     <div className="no-screenshot save-slot navable"><i className='mute icon ion-ios-game-controller-b-outline'></i></div>
                     </a>
                     <div className='slot-number'>Slot 2</div>
                     01/21/2013 @ 2:01pm
                  </div>
                  <div className="col-xs-4">
                     <a href="#">
                     <div className="no-screenshot save-slot navable"><i className='mute icon ion-ios-game-controller-b-outline'></i></div>
                     </a>
                     <div className='slot-number'>Slot 3</div>
                     06/27/2014 @ 5:58pm
                  </div>
               </div>
            </div>

        )
    }
});
