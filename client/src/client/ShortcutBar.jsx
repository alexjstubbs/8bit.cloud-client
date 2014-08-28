/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="well home_well col-md-12">
                <ul>
                    <li className='col-md-1'></li>
                    <li className="col-md-2"><strong><i className="ion-arrow-up-c"></i></strong> QUICK LAUNCH</li>
                    <li className="col-md-2"><strong><i className="ion-arrow-down-c"></i></strong> FAVORITES</li>
                    <li className="col-md-2"><strong>F5:</strong> MESSAGES</li>
                    <li className="col-md-2"><strong>F10:</strong> FRIENDS</li>
                    <li className="col-md-2"><strong>F5:</strong> SETTINGS</li>
                </ul>

            </div>
        );
    }
});