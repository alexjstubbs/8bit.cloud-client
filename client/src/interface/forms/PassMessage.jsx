/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons')
,   navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {

        return {
            navable: true,
            form: 'passMessage',
            server: "true",
            classList: 'col-xs-12'
        }
    },

    componentDidMount: function() {
        navigationInit.navigationInit();
    },

    render: function() {

        return (
            <div className="parent">

            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

            <fieldset>

            <input className="form-control input-lg navable" data-function='inputFocus' placeholder="To" name="To" type="text" />

            </fieldset>

            <button className="btn btn-lg btn-alt btn-block navable" data-function='submitForm' data-parameters={this.props.form}><i className="ion-person-add green pull-right"></i> &nbsp; Send Message</button>

            <input type="hidden" name="server" value={this.props.server} />

            </form>

            </div>
        );
    }
});
