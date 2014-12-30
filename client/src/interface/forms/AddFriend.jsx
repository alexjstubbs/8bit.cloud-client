/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons')
,   navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

    getInitialState: function() {
            return {

            }
    },

    getDefaultProps: function() {

        return {
            navable: true,
            form: 'addFriend',
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

                        <div className="col-xs-1 text-center">
                            <h2><i className="ion-person-add"></i></h2>
                        </div>

                        <div className="col-xs-11">
                            <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Username" name="username" type="text" />
                        </div>

                        <div className="col-xs-1 text-center">
                            <h2><i className="ion-chatbox"></i></h2>
                        </div>

                        <div className="col-xs-11 text-center">
                            <textarea placeholder="Optional Message to User" data-function='inputFocus' name="Message" className='textarea-height navable scrollable input-lg form-control' >
                            </textarea>
                        </div>

                    </fieldset>

                    <hr />

                    <div className="pull-left">
                        <button className="btn btn-lg btn-alt btn-alt-size navable" data-function='closeDialog' data-parameters={this.props.form}><i className="ion-close red"></i> &nbsp; Close Window</button>
                    </div>

                    <div className="pull-right">
                        <button className="btn btn-lg btn-alt btn-alt-size navable" data-function='submitForm' data-parameters={this.props.form}><i className="fa fa-circle-o-notch fa-spin"></i> &nbsp; Add as a Friend</button>
                    </div>

                    <input type="hidden" name="server" value={this.props.server} />

                </form>

            </div>
        );
    }
});
