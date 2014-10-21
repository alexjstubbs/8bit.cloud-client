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
            filename: '/config.json',
            classList: 'col-xs-12'
        }
    },

    componentDidMount: function() {

        navigationInit.modalNavigation(function() {
            navigationInit.navigationInit();
        });

    },

    render: function() {

        return (

            <div className={this.props.classList}>
                <div className="container-fluid parent">
                    <div className="row-fluid">
                        <div className="col-xs-12">
                                    
                            <h2><span className='col-xs-11'>Create a new profile</span><span className='col-xs-1'><i className='ion-person-add'></i> </span></h2>
                            
                            <div className='clearfix'></div>
                            
                            <hr />

                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

                            <fieldset>
                                
                                <div className="form-group">
                                
                                    <input className="form-control navable" data-function='inputFocus' placeholder="Choose Username" name="username" type="text" />
                                    <input className="form-control navable" data-function='inputFocus' placeholder="E-mail Address" name="email" type="text" />
                                
                                </div>
                                
                                <div className="form-group">
                                    
                                    <input className="form-control navable" data-function='inputFocus' placeholder="Password" name="password" type="password" />
                                    <input className="form-control navable" data-function='inputFocus' placeholder="Verify Password" name="password2" type="password"  />
                               
                                </div>
                           
                                <input className="btn btn-lg btn-success btn-block navable" type="button" data-function='submitForm' data-parameters={this.props.form} value="Create new Profile" />

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



