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
              "rating": {},
              "description": "",
              "title": "",
              "esrb_rating": {},
              "genre": "",
              "id": "",
              "developer": "",
              "image": ""
        };
    },

    componentDidMount: function () {
        // api.emit('request', { request: 'gameInfo', param: "Super Mario" });
        // api.on('api', this.setState.bind(this));

        var component = this;
        window.addEventListener('updateGame', function eventHandler(e) {
            component.setState(e.detail)
        });

     },

    
    render: function() {

        return (

            <div className="col-md-8 game_info col-md-offset-1 pull-right"  id="small_profile">
                     
                <div className="game_info_header" id="profile_header">
                    <div className="pull-left hidden" id="achievement_display"><i className='icon ion-ios7-star yellow'></i>  Achievements Available</div>
                    <div className="pull-right"><strong>Game Profile  <i className='ion-ios7-arrow-thin-right'></i></strong></div>
                </div>

                <div className="clearfix"></div>

                      
                <div className="info_list_name col-md-6">
                    
                    <h2><span className="game_name">{this.state.title}</span></h2>
                    
                    <hr />
                 
                    <span className="game_genre">{this.state.genre}</span> 

                    <h4>Overview</h4>
                    
                    <span className="game_deck">{this.state.description}</span> 

                    <span className="game_ersb">{this.state.ersp_rating}</span>


                </div>
                        
                <span className="col-md-3 game_image">
                    <img className="img-responsive" src={this.state.image} />
                </span>

                <div className="clearfix"></div>
                     
            </div>

        )
    }
});