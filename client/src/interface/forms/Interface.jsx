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

                <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

                    <fieldset>

                        <div className="form-group">

                            <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Username" name="username" type="text" />

                        </div>

                </fieldset>

                </form>

                <ActionButtons />

            </div>
        );
    }
});
