/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            id: "ui-alert",
            classes: null,
            icon: "trophy",
            effect: "fadeInOut",
        }
    },

    render: function() {

        return (

		<div id={this.props.id} className={"ui-alert " + this.props.classes +  " " + this.props.effect}>
			<i className={this.props.icon}></i> 
		</div>

        );
    }
});
