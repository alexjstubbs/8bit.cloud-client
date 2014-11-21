/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
       
        }
    },
    render: function() {
        return (
            <div id={this.props.id} className="parent">
             <iframe src="http://www.joystiq.com" className="browser-frame col-xs-12"></iframe>
            </div>
        );
    }
});