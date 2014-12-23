/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="dashboard-tools well home_well col-md-12">
                <ul>
                    <li className='col-md-1'></li>
                    <li className="col-md-2 navable" data-function="launchBrowser" data-parameters="http://ignition.io"><strong><i className="ion-earth"></i></strong> Web Browser</li>
                    <li className="col-md-2 navable" data-function="showTerminal"><strong><i className="icon fa fa-terminal"></i></strong> Terminal</li>
                    <li className="col-md-2 navable"><strong><i className="ion-gear-a"></i></strong> Settings</li>
                    <li className="col-md-2 navable" data-function="logOut"><strong><i className="ion-log-out"></i></strong> Logout</li>
                    <li className="col-md-2 navable"><strong><i className="ion-power"></i></strong> Shutdown</li>
                </ul>

            </div>
        );
    }
});
