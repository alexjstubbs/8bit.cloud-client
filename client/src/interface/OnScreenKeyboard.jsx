/**
 * @jsx React.DOM
 */

var React               = require('react/addons')
,   navigationInit      = require('../js/navigation.init')
,   keyboard            = require('../js/navigation.keyboard');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            input: null,
            form: 'onScreenKeyboard',
            input: "text"
        }
    },

    componentDidMount: function() {
        var recentInput = document.getElementsByClassName("activeInput")[0];
        recentInput.scrollTop = recentInput.scrollHeight;

        var cursor = document.querySelectorAll(".cursor")[0];

        cursor.scrollIntoView(true);

        var kb = document.getElementById("KB");

        var Keyboard = new keyboard.Keyboard(kb);

        navigationInit.navigationInit();
       

    },

    render: function() {

        return (

            <div>
                <div className="container-fluid parent">
                    <div className="row-fluid">
                        <div className="col-xs-12">
                                    
                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

                            <fieldset>
                                
                                <div className="form-group">

                                    <div className="form-control large-textarea"  contentEditable="true" id="placehold_input" name="textual" rows="10">
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



