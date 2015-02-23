/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="dashboard-tools well home_well col-xs-12">
                <ul>
                    <li className='col-xs-1'></li>
                    <li className="col-xs-2 navable navable-row" data-function="launchBrowser" data-parameters="http://ignition.io"><strong><i className="ion-earth"></i></strong> Web Browser</li>
                    <li className="col-xs-2 navable" data-function="showTerminal"><strong><i className="icon fa fa-terminal"></i></strong> Terminal</li>
                    <li className="col-xs-2 navable" data-function="dialogShow" data-parameters="Settings"><strong><i className="ion-gear-a"></i></strong> Settings</li>
                    <li className="col-xs-2 navable" data-function="logOut"><strong><i className="icon fa fa-sign-out"></i></strong> Logout</li>
                    <li className="col-xs-2 navable"><strong><i className="icon fa fa-power-off"></i></strong> Shutdown</li>
                </ul>

            </div>
        );
    }
});
