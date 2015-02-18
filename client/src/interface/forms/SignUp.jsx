/**
 * @jsx React.DOM
 */

var React           = require('react/addons'),
    navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            form: 'signUp',
            server: "cache",
            classList: 'col-xs-12'
        };
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    render: function() {

        var type = 1;

        return (

            <div className="row-fluid">
                <div className="col-xs-12">

                    <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>


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
                                <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Verify Password" name="verificationPassword" type="password"  />

                            </div>


                        <button className="btn btn-lg btn-blue btn-alt btn-block navable" data-function='submitForm' data-parameters={this.props.form}><i className="ion-person-add pull-left"></i> &nbsp; Create new Profile</button>
                        <button className="btn btn-lg btn-gray btn-alt btn-block navable" data-function='logInDialog'><i className="ion-person pull-left"></i> &nbsp; Use Existing Profile</button>

                        <input type="hidden" name="server" value={this.props.server} />

                    </fieldset>
                    </form>


                </div>
            </div>

        );
    }
});
