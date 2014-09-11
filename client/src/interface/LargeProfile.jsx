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

  // getInitialState: function() {
  //       //   return {
  //       //       "rating": {},
  //       //       "description": "",
  //       //       "title": "",
  //       //       "esrb_rating": {},
  //       //       "genre": "",
  //       //       "id": "",
  //       //       "developer": "",
  //       //       "image": ""
  //       // };
  //   },

    componentDidMount: function () {

     },

    
    render: function() {

        return (

            <div id="Profile">


    
        <div className="container-fluid">
         
         <header>
            <div className="navable col-md-2 boxed pull-left" data-nav='1'>
               <i className="icon ion-ios7-arrow-thin-left"></i> &nbsp; Game Listing
            </div>
         
            <span className='pull-right col-md-2'>
            <i className='icon ion-minus-round start'></i>  START &nbsp; <span className='mute'>: &nbsp; PLAY</span>
            </span>
         </header>
         
         <div className="clearfix"></div>

         <br /><br />

         <div className="col-md-2" id="profile-boxart">  
            <img src="https://s3.amazonaws.com/data.archive.vg/images/games/5379/wk866gfk32dkbw0f6x27_original.png" className="img-responsive" />
            <ul id="profile-sub-buttons">
               <li><button className='btn btn-purple'><i className='fa fa-video-camera '></i> &nbsp; Live Stream</button></li>
            </ul>
         </div>
      
         <div className="col-md-4" id="profile-gameinfo">
            <h2 id="profile-gametitle">The Legend of Zelda</h2>
            <span className='muted'>Action > Adventure</span>
            <br />
            <div className="timer">Time Played: 1:30:21</div>
            <br />
            <a id="play-game" className='btn-alt btn-lg navable selectedNav' data-nav='2' data-function="launchGame" data-parameters="">Play Game</a>
            &nbsp; 
            <a className='btn-alt btn-lg navable' data-nav='3'>Multiplayer</a>
         </div>
        
         <div className="col-md-5  pull-left" id="profile-saves">
            <div className="row">
               <div className="col-md-4">
                  <a href="#">
                  <img src="http://www.mobygames.com/images/shots/l/223581-super-mario-bros-nes-screenshot-some-worlds-are-underground.png" className="img-responsive save-slot navable" data-nav='4' />
                  </a>
                  <div className='slot-number'>Slot 1</div>
                  06/27/2014 @ 5:58pm
               </div>
               <div className="col-md-4">
                  <a href="#">
                  <img src="http://img.gamefaqs.net/screens/e/d/b/gfs_18739_2_4.jpg" className="img-responsive save-slot navable" data-nav='5' />
                  </a>
                  <div className='slot-number'>Slot 2</div>
                  01/21/2013 @ 2:01pm
               </div>
               <div className="col-md-4">
                  <a href="#">
                  <img src="http://www.consoleclassix.com/info_img/Super_Mario_Brothers_NES_ScreenShot2.jpg" className="img-responsive save-slot navable" data-nav='5' />
                  </a>
                  <div className='slot-number'>Slot 3</div>
                  06/27/2014 @ 5:58pm
               </div>
            </div>
         </div>
       
         <div className="col-md-9 profile-section">
            <h1>Achievements <span className="achievement-stats">1 out of 10 Accomplished.</span></h1>
            <ul id="achievements">
              

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
                     <h5 className='achievement-title no-padding no-margin'>"Hello World!"</h5>
                     <span className='achievement-description'>Collect your first mushroom</span>
                  </span>
               </li>
         

               <li className='col-md-3'>
                  <div className="col-md-4 pull-left trophy-icon">
                     <span className='trophy'>
                     <i className='icon base fa fa-trophy'></i>
                     <span className="fa-stack sub fa-lg hidden">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                     </span>
                     </span>
                  </div>
                  <span className='pull-right col-md-8 offset-md-2 trophy-info'>
                     <h5 className='achievement-title no-padding no-margin'>"Bowser Beatdown"</h5>
                     <span className='achievement-description'>Defeat Bowser</span>
                  </span>
               </li>
               

               <li className='col-md-3'>
                  <div className="col-md-4 pull-left trophy-icon">
                     <span className='trophy'>
                     <i className='icon base fa fa-trophy'></i>
                     <span className="fa-stack sub fa-lg hidden">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                     </span>
                     </span>
                  </div>
                  <span className='pull-right col-md-8 offset-md-2 trophy-info'>
                     <h5 className='achievement-title no-padding no-margin'>"Treasurer"</h5>
                     <span className='achievement-description'>Collect 3,000 coins</span>
                  </span>
               </li>
               

               <li className='col-md-3'>
                  <div className="col-md-4 pull-left trophy-icon">
                     <span className='trophy'>
                     <i className='icon base fa fa-trophy'></i>
                     <span className="fa-stack sub fa-lg hidden">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                     </span>
                     </span>
                  </div>
                  <span className='pull-right col-md-8 offset-md-2 trophy-info'>
                     <h5 className='achievement-title no-padding no-margin'>"Minus Hero"</h5>
                     <span className='achievement-description'>Finish minus world</span>
                  </span>
               </li>
               

               <li className='col-md-3'>
                  <div className="col-md-4 pull-left trophy-icon">
                     <span className='trophy'>
                     <i className='icon base fa fa-trophy'></i>
                     <span className="fa-stack sub fa-lg hidden">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                     </span>
                     </span>
                  </div>
                  <span className='pull-right col-md-8 offset-md-2 trophy-info'>
                     <h5 className='achievement-title no-padding no-margin'>"Pipe Dream"</h5>
                     <span className='achievement-description'>Find all Pipes</span>
                  </span>
               </li>
               

               <li className='col-md-3'>
                  <div className="col-md-4 pull-left trophy-icon">
                     <span className='trophy'>
                     <i className='icon base fa fa-trophy'></i>
                     <span className="fa-stack sub fa-lg hidden">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                     </span>
                     </span>
                  </div>
                  <span className='pull-right col-md-8 offset-md-2 trophy-info'>
                     <h5 className='achievement-title no-padding no-margin'>"Miyamoto"</h5>
                     <span className='achievement-description'>Finish the game in 20:00 minutes or less</span>
                  </span>
               </li>
               

               <li className='col-md-3'>
                  <div className="col-md-4 pull-left trophy-icon">
                     <span className='trophy'>
                     <i className='icon base fa fa-trophy'></i>
                     <span className="fa-stack sub fa-lg hidden">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                     </span>
                     </span>
                  </div>
                  <span className='pull-right col-md-8 offset-md-2 trophy-info'>
                     <h5 className='achievement-title no-padding no-margin'>"1up"</h5>
                     <span className='achievement-description'>Find 100 1ups</span>
                  </span>
               </li>
              

               <li className='col-md-3'>
                  <div className="col-md-4 pull-left trophy-icon">
                     <span className='trophy'>
                     <i className='icon base fa fa-trophy'></i>
                     <span className="fa-stack sub fa-lg hidden">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-check fa-stack-1x fa-inverse green"></i>
                     </span>
                     </span>
                  </div>
                  <span className='pull-right col-md-8 offset-md-2 trophy-info'>
                     <h5 className='achievement-title no-padding no-margin'>"Green Machine"</h5>
                     <span className='achievement-description'>Beat game with Luigi</span>
                  </span>
               </li>
               
            </ul>
         </div>
       
         <div className="col-md-10 profile-section hidden">
            <h1>Screenshots</h1>
            
         </div>
       
         <div className="col-md-10 profile-section hidden">
            <h1>Description</h1>
            <br />
            <p>He's Back! And this time the evil Dr. Wily (once the supreme power in the universe) has created even more sinister robots to mount his attack. But as MegaMan, you've also grown in power and ability. Can you save mankind from the evil desires of Dr. Wily? Each of the eight empires is ruled by a different super-robot. You must defeat each enemy on his own turf, building up weapons as you go. Only after all are destroyed will you go head-on with the mastermind himself, the evil Dr. Wily. </p>
         </div>
        
         <div className="col-md-10 profile-section hidden">
            <h1>Movies</h1>
           
         </div>
      
      </div>
   </div>

        )
    }
});