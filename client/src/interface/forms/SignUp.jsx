/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            tabIndex: 1999
        }
    },

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            form: 'signUp',
            server: true,
            classList: 'col-xs-12'
        }
    },

    componentDidMount: function() {

        var _this = this;
        navigationInit.navigationInit();

        // console.log(document.getElementById(this.props.form));


        // document.getElementById("signUp").focus();
        // document.getElementById("signUp").addEventListener("keydown", function(e) {
        //    _this.alertTest();
        // });

      
    },

    alertTest: function() {
        alert("submit..");
    },

    render: function() {

        var type = 1;

        return (

            <div className="row-fluid">
                <div className="col-xs-12">
                            
                    <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}  tabIndex={this.state.tabIndex}>


                        <fieldset>
                            
                            <div className="form-group">
                            
                                <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Choose Username" name="username" type="text" />

                                <input className="form-control input-lg navable" data-function='inputFocus' placeholder="E-mail Address" name="email" type="text" />
                            
                            </div>
                            
                            <br />

                            <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Avatar URL" name="avatar" type="text" />
                            
                            <br />

                            <div className="form-group">
                                
                                <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Password" name="password" type="password" />
                                <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Verify Password" name="password2" type="password"  />
                           
                            </div>
                       
                        
                        <button onClick={this.alertTest} className="btn btn-lg btn-alt btn-block navable" data-function='submitForm' data-parameters={this.props.form}><i className="ion-person-add green pull-right"></i> &nbsp; Create new Profile</button>
                       
                        <input type="hidden" name="server" value={this.props.server} />

                    </fieldset>
                    </form>
                      

                </div>
            </div>
           
        );
    }
});



