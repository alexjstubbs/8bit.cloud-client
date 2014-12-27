/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   _               = require('lodash')
,   NetworkStatus   = require('./NetworkStatus.jsx');

// { "type": "text", "sender": "Alex Stubbs", "attachment": null, "timestamp": 2013121210230 }

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            navStack: 2,
            Avatar: <i className='ion-person'></i>,
            Body: "No Content"
        }
    },

    render: function() {

        return (

            <div>

                <div className="col-xs-1">
                    {this.props.Avatar}
                </div>

                <div className="col-xs-11">
                    {this.props.Body}
                </div>


            </div>

        );
    }
});
