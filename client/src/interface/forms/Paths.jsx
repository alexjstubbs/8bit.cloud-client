/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons'),
    ActionButtons   = require('../ActionButtons.jsx'),
    navigationInit  = require('../../js/navigation.init'),
    _               = require('lodash');

module.exports = React.createClass({

    render: function() {

        return (
            <div className="_parent">
                <form accept-charset="UTF-8" role="form" name="Paths" id="Paths">


                    <fieldset>

                        <div className="form-group">

                            <h3><i className="ion-folder"></i> &nbsp; Path to ROMs folder</h3> <span class="mute">Absolute path to the root of your roms folder</span>
                            <input className="form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.paths.roms : null} name="roms" type="text" />



                            <h3><i className="ion-folder"></i> &nbsp; Path Save State folder</h3><span class="mute">Absolute path to the root of your save states folder</span>
                            <input className="form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.paths.saves : null} name="saves" type="text" />



                            <h3><i className="ion-images"></i> &nbsp; Path to Cover Art folder</h3> <span class="mute">Any images located here will show by default</span>
                            <input className="form-control input-lg navable" data-function='inputFocus' value={!_.isEmpty(this.props.settings) ? this.props.settings.paths.covers : null} name="cover" type="text" />


                        </div>


                </fieldset>

            </form>

            <ActionButtons form="Paths" />

            </div>
        );
    }
});
