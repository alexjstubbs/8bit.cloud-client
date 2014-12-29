/**
 * @jsx React.DOM
 */

'use strict';

var React               = require('react/addons')
,   _                   = require('lodash')
,   PlatformList        = require('./PlatformList.jsx')
,   GamesList           = require('./GamesList.jsx')
,   SmallProfile        = require('./SmallProfile.jsx')
,   browserNavigation   = require('../js/navigation.browser.js').browserNavigation;

/* Components
-------------------------------------------------- */
module.exports = React.createClass({

    getInitialState: function() {
        return {
            hidden: false,
            parent: false
        };
    },

    screenTransition: function(e) {
        if (e.detail.screen === "Browser") {
            this.setProps(e.detail)
            document.getElementById("main").setAttribute("data-screen", "browser");
        }
    },

    componentDidMount: function() {


        var component = this;
        window.addEventListener('screenTransition', function eventHandler(e) {
              component.screenTransition(e);
        });

    },

    getDefaultProps: function() {
        return {
          hidden: true,
            parent: false,
            params: "",
            navable: true,
            dataNav: 0
        }
    },

    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'container-fluid': true,
            'navable': false,
            'browser_header': true,
          
        });

        return (

             <div className="parent">

             <div className={classes}> 

             <PlatformList platforms={this.props.platforms} />


                    <div id="area" className='col-xs-12'> 

                        <div data-screen='list' className="text-center col-xs-12 screen row-fluid up10"> 
              
                          <ul className="pagination pagination-md" id="browser_pagination">
                            <li data-alpha='#'><a href="#A">#</a></li>
                            <li data-alpha='A'><a href="#A">A</a></li>
                            <li data-alpha='B'><a href="#B">B</a></li>
                            <li data-alpha='C'><a href="#C">C</a></li>
                            <li data-alpha='D'><a href="#D">D</a></li>
                            <li data-alpha='E'><a href="#E">E</a></li>
                            <li data-alpha='F'><a href="#F">F</a></li>
                            <li data-alpha='G'><a href="#G">G</a></li>
                            <li data-alpha='H'><a href="#H">H</a></li>
                            <li data-alpha='I'><a href="#I">I</a></li>
                            <li data-alpha='J'><a href="#J">J</a></li>
                            <li data-alpha='K'><a href="#K">K</a></li>
                            <li data-alpha='L'><a href="#L">L</a></li>
                            <li data-alpha='M'><a href="#M">M</a></li>
                            <li data-alpha='N'><a href="#N">N</a></li>
                            <li data-alpha='O'><a href="#O">O</a></li>
                            <li data-alpha='P'><a href="#P">P</a></li>
                            <li data-alpha='Q'><a href="#Q">Q</a></li>
                            <li data-alpha='R'><a href="#R">R</a></li>
                            <li data-alpha='S'><a href="#S">S</a></li>
                            <li data-alpha='T'><a href="#T">T</a></li>
                            <li data-alpha='U'><a href="#U">U</a></li>
                            <li data-alpha='V'><a href="#V">V</a></li>
                            <li data-alpha='W'><a href="#W">W</a></li>
                            <li data-alpha='X'><a href="#X">X</a></li>
                            <li data-alpha='Y'><a href="#Y">Y</a></li>
                            <li data-alpha='Z'><a href="#Z">Z</a></li>
                          </ul>

                    <div className="browser-list">

                    <GamesList gamesList={this.props.gamesList} />
  
                  <SmallProfile />
                       

            <div className="clearfix"></div>
            
            <div className='hidden'>

                <div className="col-xs-12 alpha_list"> 

                    <table className="table table-striped" id="list">
                    
                    </table>   


                  </div> 
                                   
                </div> 

             <div className="hidden" id="working_params">{this.props.params}</div>
             

            </div>

            </div></div></div></div>

        )
    }
});