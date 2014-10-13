/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   NetworkStatus   = require('./NetworkStatus.jsx');

module.exports = React.createClass({
    render: function() {
        return (
             <div>
                <div>
                    <div className="col-md-4">
                    <div className="square pull-left col-md-2">
                        {this.props.avatar}
                    </div>
                    <div className="hello col-md-8">
                        <h3 className="nopadding">Welcome, {this.props.username} <span className="muted"></span></h3>
                        <NetworkStatus isOnline={this.props.isOnline} />
                    </div>
                </div>
            </div>
        </div>
        );
    }
});