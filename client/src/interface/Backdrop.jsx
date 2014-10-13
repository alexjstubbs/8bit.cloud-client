/**
 * @jsx React.DOM
 */

'use strict';

var React   = require('react/addons')
,   _       = require('lodash');


module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: false,
            id: "backdrop",
            classList: "systemNotificationContentBackdrop"
        }
    },
    render: function() {

        return (

            <div id={this.props.id} className={this.props.classList}>
            </div>

        );
    }
});



