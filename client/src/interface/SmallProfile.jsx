/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    api = require('socket.io-client')('/api'),
    _ = require('lodash');

module.exports = React.createClass({

  getInitialState: function() {
          return {
            gameInfo: [
                    {
                      "rating": {},
                      "description": "Super Mario Bros., which stars Nintendo's classic mascot hero Mario in 30-some levels of inspired 2D platforming, introduced millions of players to videogames and left them captivated. Super Mario Bros. remains one of the most pioneering and influential titles to date. More importantly, it's every bit as addictive, enjoyable, and satisfying today as it was two decades ago. ",
                      "title": "Super Mario Bros.",
                      "system": "nes",
                      "system_title": "NES",
                      "esrb_rating": {},
                      "genre": "2D > Action > Platformer",
                      "id": "5379",
                      "developer": "Nintendo"
                    }

                ]
        };
    },

    componentDidMount: function () {
        // api.emit('request', { request: 'gameInfo', param: "Super Mario" });
        api.on('api', this.setState.bind(this));
     },

// <img className="img-responsive" src={gameImage} />
    
    render: function() {


        var gameImage = "http://localhost:1210/games/nes/bionic commando";

        return (


            <div className="col-md-8 game_info col-md-offset-1 pull-right"  id="small_profile">
                     
                <div className="game_info_header" id="profile_header">
                    <div className="pull-left hidden" id="achievement_display"><i className='icon ion-ios7-star yellow'></i>  Achievements Available</div>
                    <div className="pull-right"><strong>Game Profile  <i className='ion-ios7-arrow-thin-right'></i></strong></div>
                </div>

                <div className="clearfix"></div>

                      
                <div className="info_list_name col-md-6">
                    
                    <h2><span className="game_name">{this.state.gameInfo.title}</span></h2>
                    
                    <hr />
                 
                    <span className="game_genre">{this.state.gameInfo.genre}</span> 

                    <h4>Overview</h4>
                    
                    <span className="game_deck">{this.state.gameInfo.description}</span> 

                    <span className="game_ersb">{this.state.gameInfo.ersp_rating}</span>


                </div>
                        
                <span className="col-md-3 game_image">
                    <img className="img-responsive" src={gameImage} />
                </span>

                <div className="clearfix"></div>
                     
            </div>

        )
    }
});