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

             <div className="col-md-5  pull-left" id="profile-saves">
               <div className="row">
                  <div className="col-md-4">
                     <a href="#">
                     <img src="http://www.mobygames.com/images/shots/l/223581-super-mario-bros-nes-screenshot-some-worlds-are-underground.png" className="img-responsive save-slot navable" />
                     </a>
                     <div className='slot-number'>Slot 1</div>
                     06/27/2014 @ 5:58pm
                  </div>
                  <div className="col-md-4">
                     <a href="#">
                     <img src="http://img.gamefaqs.net/screens/e/d/b/gfs_18739_2_4.jpg" className="img-responsive save-slot navable" />
                     </a>
                     <div className='slot-number'>Slot 2</div>
                     01/21/2013 @ 2:01pm
                  </div>
                  <div className="col-md-4">
                     <a href="#">
                     <img src="http://www.consoleclassix.com/info_img/Super_Mario_Brothers_NES_ScreenShot2.jpg" className="img-responsive save-slot navable" />
                     </a>
                     <div className='slot-number'>Slot 3</div>
                     06/27/2014 @ 5:58pm
                  </div>
               </div>
            </div>
       
        )
    }
});