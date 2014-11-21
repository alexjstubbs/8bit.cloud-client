/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   api             = require('socket.io-client')('/api')
,   navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            form: 'userSignupForm',
            server: false,
            filename: '/Wifi-TEMP.json',
            classList: 'col-xs-12'
        }
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

        var textarea = document.getElementById("EULA");

        /* EULA Ajax Call
        -------------------------------------------------- */
        
        request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:1210/WifiConfig', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400){
            // Success!
            var file = request.responseText;
            textarea.value = file;


          } else {
            textarea.value = "Unkown Error";

          }
        };

        request.onerror = function(err) {
          textarea.value = err;
        };

        request.send();

    },

    render: function() {

        return (

                   <div className="row-fluid ">

                        <div className="col-xs-12">
                                    
                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>


                            <fieldset>
                            
                                
                                <div className="form-group">
                                    
                                      <textarea id="EULA" className="form-control navable" data-function='inputFocus'>
                                      </textarea>
                               
                                </div>
                           
                                <button className="btn btn-lg btn-alt btn-block navable" data-function='submitForm' data-parameters={this.props.form}>Save Configuration File</button>
                                <button className="btn btn-lg btn-alt btn-block navable" data-function='submitForm' data-parameters={this.props.form}>Cancel</button>

                                <input type="hidden" name="server" value={this.props.server} />
                                <input type="hidden" name="filename" value={this.props.filename} />

                            </fieldset>
                            </form>
                              
                </div>
            </div>              
         
        );
    }
});



