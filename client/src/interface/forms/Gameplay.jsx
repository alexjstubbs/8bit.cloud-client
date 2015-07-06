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
                <form accept-charset="UTF-8" role="form" name="Gameplay" id="Gameplay">


                    <fieldset>

                        <div className="form-group">

                            <h3 className="col-xs-7 no-padding"><i className="ion-android-list"></i> &nbsp; Display Userspace:</h3>

                                <h3 className="col-xs-5">

                                    <ul id="radio-userSpace" className="radio-wrapper text-right">
                                        <li className="col-xs-12"><RadioSelect row="true" group="userSpace" id="userSpace" label='Enabled' name="true" selected={this.props.settings.gameplay.show_userspace == "true" ? "true" : "false" } /></li>
                                    </ul>

                                </h3>

                                <div className="clearfix"></div>
                                <hr className="hr-thin" />

                                <h3 className="col-xs-7 no-padding"><i className="ion-trophy"></i> &nbsp; Achievements:</h3>

                                    <h3 className="col-xs-5">

                                        <ul id="radio-achievements" className="radio-wrapper text-right">
                                            <li className="col-xs-12"><RadioSelect row="true" group="achievements" id="achievements-enable" label='Enabled' name="true" selected={this.props.settings.gameplay.run_achievements == "true" ? "true" : "false" } /></li>
                                        </ul>

                                </h3>


                        </div>


                </fieldset>

                <input type="hidden" id="input-userSpace" name="show_userspace" value="" />
                <input type="hidden" id="input-achievements" name="run_achievements" value="" />

            </form>

            <ActionButtons form="Gameplay" />

            </div>
        );
    }
});
