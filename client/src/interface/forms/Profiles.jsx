/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons'),
    ActionButtons   = require('../ActionButtons.jsx'),
    navigationInit  = require('../../js/navigation.init'),
    RadioSelect     = require('./RadioSelect.jsx'),
    _               = require('lodash');

module.exports = React.createClass({

    render: function() {

        return (
            <div className="_parent">
                <form accept-charset="UTF-8" role="form" name="Profiles" id="Profiles">


                    <fieldset>

                        <div className="form-group">

                            <h3 className="col-xs-7 no-padding"><i className="ion-log-in"></i> &nbsp; Automatically Login:</h3>

                                <h3 className="col-xs-5">

                                    <ul id="radio-networkType" className="radio-wrapper text-right">
                                        <li className="col-xs-12"><RadioSelect group="autoLogin" id="radio-autoLogin" label='Enable' name="auto_login" selected={this.props.settings.profiles.auto_login == true ? "true" : "false" } /></li>
                                    </ul>
                                    
                                </h3>


                        </div>


                </fieldset>

            </form>

            <ActionButtons form="Profiles" />

            </div>
        );
    }
});
