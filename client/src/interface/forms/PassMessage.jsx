/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons')
,   navigationInit  = require('../../js/navigation.init')
,   Avatar          = require('../Avatar.jsx');

module.exports = React.createClass({

    getInitialState: function() {
            return {
                type: "message"
            }
    },

    getDefaultProps: function() {

        return {
            navable: true,
            form: 'passMessage',
            backdrop: true,
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

            <div className="col-xs-1">
                <Avatar />
            </div>


            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

            <fieldset className="col-xs-11">

                <span className="col-xs-12">

                    <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Recipient Username" value={this.props.To} name="To" type="text" />

                    <textarea data-function='inputFocus' name="Body" className='textarea-height navable scrollable form-control' >
                    </textarea>

                </span>

            </fieldset>

            <div className="clearfix"></div>

            <hr />

            <div className="pull-right">

                <button className="btn btn-alt btn-alt-size navable" data-function='closeDialog'> <i className="ion-close red"></i> &nbsp; Cancel Message</button>
                <button className="btn btn-alt btn-alt-size navable" data-function='submitForm' data-parameters={this.props.form}> <i className="ion-person-add green"></i> &nbsp; Send Message</button>

            </div>

            <input type="hidden" name="Type" value={this.state.type} />
            <input type="hidden" name="server" value={this.props.server} />

            </form>

            </div>
        );
    }
});
