/**
 * @jsx React.DOM
 */

var React               = require('react/addons')
,   navigationInit      = require('../js/navigation.init')
,   keyboard            = require('../js/navigation.keyboard');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable:    true,
            navStack:   2,
            input:      null,
            form:       'onScreenKeyboard',
            input:      "text",
            type:       "alpha"

        }
    },

    componentDidMount: function() {

        var _this = this;


        var recentInput = document.getElementsByClassName("activeInput")[0];
        recentInput.scrollTop = recentInput.scrollHeight;

        var cursor = document.querySelectorAll(".cursor")[0];

        cursor.scrollIntoView(true);

        var kb = document.getElementById("KB");

        if (this.props.type == "symbols") {
            var Keyboard = new keyboard.symbolsKeyboard(kb);
        }

        else {
            var Keyboard = new keyboard.Keyboard(kb);
        }

         window.addEventListener("updateKeyboard", function(e) {
            _this.setProps.type = e.detail;
            kb.innerHTML = "";
            var Keyboard = new keyboard.symbolsKeyboard(kb);
            navigationInit.navigationInit();
        });


        navigationInit.navigationInit();
       

    },

    render: function() {


        return (

            <div className="input-keyboard" data-proptype={this.props.input}>
                <div className="container-fluid parent">
                    <div className="row-fluid">
                        <div className="col-xs-12">
                                    
                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

                            <fieldset>
                                
                                <div className="form-group">

                                    <div className="form-control" data-inputtype={this.props.input}  contentEditable="true" id="placehold_input" name="textual" rows="10">
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



