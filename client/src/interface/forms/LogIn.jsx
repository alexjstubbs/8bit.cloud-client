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
            form: 'logIn',
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

            <div className="row-fluid parent">
                <div className="col-xs-12">

                    <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>


                        <fieldset>

                            <div className="form-group">

                                <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Username" name="username" type="text" />

                                <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Password" name="password" type="password" />

                            </div>


                        <button className="btn btn-lg btn-blue btn-alt btn-block navable" data-function='submitForm' data-parameters={this.props.form}>Log In</button>
                        <button className="btn btn-lg btn-alt btn-block navable" data-function='closeDialog' data-parameters={this.props.form}>Cancel</button>

                        <input type="hidden" name="server" value={this.props.server} />

                    </fieldset>

                    </form>


                </div>
            </div>

        );
    }
});
