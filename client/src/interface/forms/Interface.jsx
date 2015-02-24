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

                            <h3 className="col-xs-4">Default Screen:</h3>

                            <h3 className="col-xs-8 ">

                                <ul id="radio-defaultScreen" className="radio-wrapper text-right">
                                    <li className="col-xs-9"><RadioSelect group="defaultScreen" id="radio-defaultScreen-browser" label='Games Browser' selected='false' /></li>
                                    <li className="col-xs-3"><RadioSelect group="defaultScreen" id="radio-defaultScreen-dashboard" label='Dashboard' selected='true' /></li>
                                </ul>
                            </h3>


                        </div>


                </fieldset>

            </form>

            <ActionButtons form="Interface" />

            </div>
        );
    }
});
