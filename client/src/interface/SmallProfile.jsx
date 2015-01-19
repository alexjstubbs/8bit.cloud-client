/**
 * @jsx React.DOM
 */

/* TODO: Get event listener to update state correctly on newly stored games.
-------------------------------------------------- */

'use strict';

var React           = require('react/addons')
,   api             = require('socket.io-client')('/api')
,   _               = require('lodash')
,   sevents          = require('../js/system.events')
,   achievements;


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
              "image": "",
              "crc32": null
        };
    },

    screenMount: function() {

        //switchEmulator
        var short = document.querySelectorAll(".selected");
        console.log(short);
    },

    componentDidMount: function () {

        var component = this;

        window.addEventListener('updateGame', function eventHandler(e) {
            component.setState(e.detail);
        });

        api.on('api', this.setState.bind(this));


     },

    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'pull-left': true
        });

        return (

            <div className="col-xs-8 game_info col-xs-offset-1 pull-right"  id="small_profile">

                <div className="game_info_header" id="profile_header">
                    <div className={this.state.crc32 ? classes : classes + " hidden"} data-achievements={this.props.crc32} id="achievement_display"><i className='icon ion-ios-star yellow'></i>  Achievements Available</div>
                    <div className="pull-right"><strong>Game Profile  <i className='ion-ios-arrow-thin-right'></i></strong></div>
                </div>

                <div className="clearfix"></div>


                <div className="info_list_name col-xs-6">

                    <h2><span className="game_name">{this.state.title}</span></h2>

                    {this.state.title ? <hr /> : null}

                    <span className="game_genre">{this.state.genre}</span>

                    {this.state.title ? <h4>Overview</h4> : null }

                    <p className="game_deck">{this.state.description}</p>

                    <span className="game_ersb">{this.state.ersp_rating}</span>


                </div>

                <span className="col-xs-3 game_image">
                    {this.state.image ? <img className="img-responsive" src={this.state.image} /> : null }
                </span>

                <div className="clearfix"></div>

            </div>

        )
    }
});
