/**
 * @jsx React.DOM
 */

'use strict';

var React               = require('react/addons'),
    _                   = require('lodash'),
    Avatar              = require('./Avatar.jsx'),
    api                 = require('socket.io-client')('/api'),
    mixins              = require('./mixins/mixins.jsx'),
    NetworkStatus       = require('./NetworkStatus.jsx'),
    navigationInit      = require('../js/navigation.init'),
    Timer               = require('./Timer.jsx');

/* Components
-------------------------------------------------- */
module.exports = React.createClass({

    getDefaultProps: function() {
        return {

            id: "userspace-right"

        };
    },

    componentDidMount: function() {
        navigationInit.navigationInit();
    },

    render: function() {

        return (

            <div id={this.props.id} className="parent">
                <div clasName="user-space-right container">

                    <div className="col-xs-12">
                        <h3>Options</h3>
                        <hr />
                    </div>

                    <div className="clearfix"></div>

                    <small>

                    <a className="btn btn-alt btn-block btn-left-align btn-alt btn-sm navable navable-row"><i className="ion-ios-game-controller-b"></i> &nbsp; Invite Friend</a>
                        <br /><br />
                    <a className="btn btn-alt btn-block btn-left-align btn-alt btn-sm navable navable-row" data-function="viewMessages"><i className="ion-chatbubbles"></i> &nbsp; Messages</a>
                        <br /><br />
                    <a className="btn btn-alt btn-block btn-left-align btn-alt btn-sm navable navable-row" data-function="dialogShow" data-parameters="AchievementNodes"><i className="ion-trophy"></i> &nbsp; View Achievements</a>

                        <hr />

                    <a className="btn btn-block btn-left-align btn-alt btn-sm navable navable-row" data-function="takeScreenshot"><i className="ion-image"></i> &nbsp; Take Screenshot</a>
                        <br /><br />
                    <a className="btn btn-block btn-left-align btn-alt btn-sm navable navable-row" data-function="saveState"><i className="ion-ios-cloud-download-outline"></i> &nbsp; Save State</a>
                        <br /><br />
                    <a className="btn btn-block btn-left-align btn-alt btn-sm navable navable-row" data-function="loadState"><i className="ion-more"></i> &nbsp; Load State</a>

                        <hr />

                    <a className="btn btn-block btn-left-align btn-alt btn-sm navable navable-row" data-function="resumeClient"><i className="ion-android-cancel"></i> &nbsp; Quit Game</a>

                    </small>


                </div>
            </div>

        )
    }
});
