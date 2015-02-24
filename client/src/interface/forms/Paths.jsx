/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons'),
    ActionButtons   = require('../ActionButtons.jsx'),
    navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {

    },

    componentDidMount: function() {
        // navigationInit.navigationInit();
    },

    render: function() {

        return (
            <div className="_parent">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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

                <ActionButtons />

            </div>
        );
    }
});
