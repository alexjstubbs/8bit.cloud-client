/**
 * @jsx React.DOM
 */

'use strict';

var React               = require('react/addons')
,   _                   = require('lodash')
,   Avatar              = require('./Avatar.jsx')
,   api                 = require('socket.io-client')('/api')
,   mixins              = require('./mixins/mixins.jsx')
,   NetworkStatus       = require('./NetworkStatus.jsx')
,   Timer               = require('./Timer.jsx');

/* Components
-------------------------------------------------- */
module.exports = React.createClass({

    getDefaultProps: function() {
        return {

            id: "userspace-right"

        }
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
                    <a className="btn btn-alt btn-sm navable mute"><i className="ion-videocamera"></i> &nbsp; Record Movie</a>
                    <a className="btn btn-alt btn-sm navable mute"><i className="ion-qr-scanner"></i> &nbsp; Take Screenshot</a>
                    <a className="btn btn-alt btn-sm navable mute"><i className="ion-qr-scanner"></i> &nbsp; Take Screenshot</a>
                    </small>


                </div>
            </div>

        )
    }
});
