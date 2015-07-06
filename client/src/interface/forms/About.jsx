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

                            <h3><span className="col-xs-3">Ignition Client:</span> <span className="mute col-xs-8">{this.props.settings.about.version}</span></h3>
                            <div className="clearfix"></div>
                            <hr className="hr-thin" />

                            <h3><span className="col-xs-3">License:</span> <span className="mute col-xs-8">{this.props.settings.about.license}</span></h3>
                            <div className="clearfix"></div>
                            <hr className="hr-thin" />

                            <h3><span className="col-xs-3">Copyright:</span> <span className="mute col-xs-8">Copyright &copy;  {this.props.settings.about.author}. All rights reserved.</span></h3>
                            <div className="clearfix"></div>
                            <hr className="hr-thin" />

                            <h3><span className="col-xs-3">Release:</span> <span className="mute col-xs-8">{this.props.settings.about.release}</span></h3>

                        </div>


                </fieldset>

                <input type="hidden" id="input-userSpace" name="screen" value="" />

            </form>

            <ActionButtons form="Gameplay" />

            </div>
        );
    }
});
