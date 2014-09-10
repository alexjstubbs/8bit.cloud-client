/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
        _ = require('lodash'),
        Platform = require('./Platform.jsx'),
        getFirstChild = require('../js/helpers.js').getFirstChild,
        api = require('socket.io-client')('/api');

module.exports = React.createClass({

    getInitialState: function() {
      

        return {
            platforms: [
                {},
                ]
        };
    },

    componentDidMount: function () {

        var el = getFirstChild(document.getElementById("platform-list"));
        el.classList.add("selectedNav", "selected");

        api.emit('request', { request: 'platformList'});
        api.on('api', this.setState.bind(this));

     },

    getDefaultProps: function() {

    return {
            defautSelect: true,
            navable: true,
            navStack: 0
        }
    },

    render: function() {

         var platformNodes = this.state.platforms.map(function (platform, i) {
            return <Platform platform={platform.long} short={platform.short} emulators={platform.emulators} navStack={i+1} />
        });

        return (

            <span>

             <div className="hidden" id="platforms">{this.props.platforms}</div>

                    <header id="heading">

                        <div className="col-md-12 text-left">

                            <ul id="platform-list" className="platform-list scroll-into-view">      
                           
                                {platformNodes}      
                           
                            </ul>
                
                        </div>

                    </header>

                    <div className="clearfix"></div>
                    
                    <div className="col-lg-12">
                        <hr className='mute' />
                    </div> 

            </span>

            );
        
    }
});