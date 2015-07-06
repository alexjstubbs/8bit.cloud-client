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
                <form accept-charset="UTF-8" role="form" name="Interface" id="Interface">


                    <fieldset>

                        <div className="form-group">

                            <h3 className="col-xs-4 no-padding"><i className="ion-ios-monitor"></i> &nbsp; Default Screen:</h3>

                            <h3 className="col-xs-8 wrapper">

                                <ul id="radio-defaultScreen" className="radio-wrapper text-right">
                                    <li className="col-xs-8"><RadioSelect group="defaultScreen" id="radio-defaultScreen-dashboard" label='Dashboard' name="Dashboard" selected={this.props.settings.interface.screen == "Dashboard" ? "true" : "false" } /></li>
                                    <li className="col-xs-2"><RadioSelect group="defaultScreen" id="radio-defaultScreen-browser" label='Games Browser' name="Browser" selected={this.props.settings.interface.screen == "Browser" ? "true" : "false" } />&nbsp; </li>
                                </ul>
                            </h3>


                        <div className="clearfix"></div>
                        <hr className="hr-thin" />

                        <h3><i className="ion-android-color-palette"></i> &nbsp; Theme Path</h3>
                        <input className="navable-row form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.interface.theme : null} name="theme" type="text" />

                        <hr className="hr-thin" />

                        <h3><i className="ion-search"></i> &nbsp; Zoom Level</h3>
                        <input className="navable-row form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.interface.zoom : null} name="zoom" type="text" />

                        <hr className="hr-thin" />

                        <h3><i className="ion-home"></i> &nbsp;  Browser Homepage</h3>
                        <input className="navable-row form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.interface.browser_url : null} name="browser_url" type="text" />

                        </div>

                </fieldset>

                <input type="hidden" id="input-defaultScreen" name="screen" value="" />

            </form>

            <ActionButtons form="Interface" />

            </div>
        );
    }
});
