/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   api             = require('socket.io-client')('/api')
,   navigationInit  = require('../../js/navigation.init')
,   clientEvents    = require('../../js/system.events');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            form: 'userSignupForm',
            server: false,
            filename: '/SignUp-TEMP.json',
            classList: 'col-xs-12'
        }
    },

    componentDidMount: function() {

        navigationInit.modalNavigation(function() {
            navigationInit.navigationInit();
        });

        var textarea = document.getElementById("EULA");

        /* EULA Ajax Call
        -------------------------------------------------- */
        
        request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:1210/EULA', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400){
            // Success!
            var EULA = request.responseText;
            textarea.value = EULA;


          } else {
            // We reached our target server, but it returned an error

          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

        request.send();

    },

    render: function() {

        return (

            <div className={this.props.classList}>
                <div className="container-fluid parent">
                    <div className="row-fluid">
                        <div className="col-xs-12">
                                    
                            <h2><span className='col-xs-11'>End User Agreement</span></h2>
                            
                            <div className='clearfix'></div>
                            
                            <hr />

                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

                            <fieldset>
                            
                                
                                <div className="form-group">
                                    
                                      <textarea id="EULA" className="form-control navable" data-function='inputFocus'>
                                      </textarea>
                               
                                </div>
                           
                                <input className="btn btn-lg btn-success btn-block navable" type="button" data-function='submitForm' data-parameters={this.props.form} value="I Agree" />

                                <input type="hidden" name="server" value={this.props.server} />
                                <input type="hidden" name="filename" value={this.props.filename} />

                            </fieldset>
                            </form>
                              

                        </div>
                    </div>
                </div>
            </div>              
         
        );
    }
});



