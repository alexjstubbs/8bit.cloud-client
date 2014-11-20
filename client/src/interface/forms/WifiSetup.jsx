/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: false,
            navStack: 2,
            form: 'Wifi.json',
            server: true,
            classList: 'col-xs-12'
        }
    },

    componentDidMount: function() {

        navigationInit.navigationInit();
      
    },

    render: function() {

        var type = 1;

        return (

                    <div className="row-fluid ">
                        <div className="col-xs-12">
                                    
                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>


                                <fieldset>
                                    
                                    <div className="form-group">
                                    
                                        <input id="wifi-adapter" className="form-control input-lg navable" data-function='inputFocus' placeholder="wlan0" name="wifi-adapter" type="text" />
                                     
                                           

                                     
                                    </div>

                                    <div className="form-group">
                                        
                                        <input className="form-control input-lg navable" data-function='inputFocus' placeholder="SSID" name="password" type="password" />
                                        <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Password/Passphrase" name="password2" type="password"  />
                                   
                                    </div>
                               
                                
                                <button className="btn btn-lg btn-alt btn-block navable" data-function='submitForm' data-parameters={this.props.form}><i className="ion-wifi green pull-right"></i> &nbsp; Save Wireless Configuration</button>
                                <button className="btn btn-lg btn-alt btn-block navable" data-function='openDialog' data-parameters={type}><i className="ion-close-circled red pull-right"></i> &nbsp; Continue Offline</button>

                                <br />
                                <br />

                                <button className="btn btn-lg btn-alt btn-block navable" data-function='submitForm' data-parameters={this.props.form}><i className="ion-settings red pull-right"></i> &nbsp; Advanced Set Up</button>
               

                                <input type="hidden" name="server" value={this.props.server} />
                                <input type="hidden" name="filename" value={this.props.filename} />

                            </fieldset>
                            </form>
                              

                        </div>
                    </div>
           
                  
         
        );
    }
});



