/**
 * @jsx React.DOM
 */

var React               = require('react/addons')
,   navigationInit      = require('../js/navigation.init')
,   _keyboard           = require('../js/navigation.keyboard')
,   keyboardKeyEvents   = require('../js/navigation.keyboardKeyEvents');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            type:       "alpha",
            tabIndex:   1999
        }
    },

    getDefaultProps: function() {

        return {
                navable:    true,
                navStack:   2,
                input:      null,
                form:       'onScreenKeyboard',
                input:      "text"
            }
    },

    componentDidMount: function() {

        var _this = this;

        var recentInput = document.getElementsByClassName("activeInput")[0];
        recentInput.scrollTop = recentInput.scrollHeight;

        var cursor = document.querySelectorAll(".cursor")[0];

        cursor.scrollIntoView(true);

        var kb = document.getElementById("KB");

        if (this.state.type == "symbols") {
            var Keyboard = new _keyboard.symbolsKeyboard(kb);
        }

        else {
            var Keyboard = new _keyboard.Keyboard(kb);

        }

         window.addEventListener("updateKeyboard", function(e) {


            _this.setState({type: e.detail.type});

            kb.innerHTML = "";

            if (e.detail.type == "symbols") {
                var Keyboard = new _keyboard.symbolsKeyboard(kb);
            }

            else {
                var Keyboard = new _keyboard.Keyboard(kb);
            }
            
            navigationInit.navigationInit();
        });

    
        navigationInit.navigationInit();
       
        document.querySelectorAll(".input-keyboard")[0].focus();
        document.querySelectorAll(".input-keyboard")[0].addEventListener("keypress", function(e) {
             if (e.charCode) {
                keyboardKeyEvents.keypress(e.key);
            }
        });

    },

    render: function() {


        return (

            <div className="input-keyboard" tabIndex={this.state.tabIndex} data-proptype={this.props.input}>
                <div className="container-fluid parent">
                    <div className="row-fluid">
                        <div className="col-xs-12">
                                    
                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

                            <fieldset>
                                
                                <div className="form-group">

                                    <div className="form-control" data-keyboardtype={this.state.type} data-inputtype={this.props.input} contentEditable="true" id="placehold_input" name="textual" rows="10">
                                        <span id="keyboard-input-area">{this.props.value}</span> 
                                        <i className="cursor">_</i>
                                    </div> 

                                </div>
                                
                              <div id="KB"></div> 
            
                            </fieldset>
                            </form>
                              
                              
                        </div>
                    </div>
                </div>
            </div>              
         
        );
    }
});



