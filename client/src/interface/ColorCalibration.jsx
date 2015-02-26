/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons'),
    ActionButtons   = require('./ActionButtons.jsx');

module.exports = React.createClass({

    render: function() {

        return (

            <div className="_parent">


                    <h3>Adjust your television display settings so that the far left icon is just barely visible</h3>

                    <hr className="hr-thin" />

                    <span className="col-xs-4 color-calibration-darkest">
                        <i className="ion-android-sunny"></i>
                    </span>

                    <span className="col-xs-4 color-calibration-darker">
                        <i className="ion-android-sunny"></i>
                    </span>

                    <span className="col-xs-4 color-calibration-dark">
                        <i className="ion-android-sunny"></i>
                    </span>

                    <div className="clearfix"></div>
                



            <ActionButtons form="Profiles" />

            </div>

        );
    }
});
