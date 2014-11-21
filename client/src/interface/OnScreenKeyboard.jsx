/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   navigationInit  = require('../js/navigation.init')
,   keyboard        = require('../js/navigation.keyboard');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            input: null,
            form: 'onScreenKeyboard'
        }
    },

    componentDidMount: function() {

        var kb = document.getElementById("KB");

        var Keyboard = new keyboard.Keyboard(kb);

        navigationInit.navigationInit();
       

    },

    render: function() {

        return (

            <div>
            <i className='ion-loading-c'></i>
                <div className="container-fluid parent">
                    <div className="row-fluid">
                        <div className="col-xs-12">
                                    
                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

                            <fieldset>
                                
                                <div className="form-group">
                                    <input className="form-control input-lg" id="placehold_input" placeholder="Enter Text..." name="textual" type="text" />
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



