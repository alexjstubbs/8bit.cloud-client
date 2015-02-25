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
                <form accept-charset="UTF-8" role="form" name="Network" id="Network">


                    <fieldset>

                        <div className="form-group">

                            <h3 className="col-xs-4 no-padding"><i className="ion-android-wifi"></i> &nbsp; Connection Type:</h3>

                                <h3 className="col-xs-8 wrapper">

                                    <ul id="radio-networkType" className="radio-wrapper text-right">
                                        <li className="col-xs-10"><RadioSelect group="networkType" id="radio-networkType-wired" label='Wired' name="Wired" selected={this.props.settings.network.type == "Wired" ? "true" : "false" } /></li>
                                        <li className="col-xs-2"><RadioSelect group="networkType" id="radio-networkType-wireless" label='Wireless' name="Wireless" selected={this.props.settings.network.type == "Wireless" ? "true" : "false" } />&nbsp; </li>
                                    </ul>
                                </h3>

                            <div className="clearfix"></div>
                            <hr className="hr-thin" />

                            <h3><i className="ion-outlet"></i> &nbsp; Interface</h3>
                            <input className="form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.network.interface : null} name="interface" type="text" />

                            <hr className="hr-thin" />

                            <h3><i className="ion-wifi"></i> &nbsp; SSID</h3>
                            <input className="form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.network.ssid : null} name="ssid" type="text" />

                            <h3><i className="ion-lock-combination"></i> &nbsp; Passphrase</h3>
                            <input className="form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.network.passphrase : null} name="passphrase" type="password" />


                        </div>


                </fieldset>

                <input type="hidden" id="input-networkType" name="type" value="" />

            </form>

            <ActionButtons form="Network" />

            </div>
        );
    }
});
