/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            icon: "ion-close-circled"
        }
    },

    componentDidMount: function() {
        console.log("CALLED");
    },

    render: function() {

        return (

		<div className="ui-alert">
			<i className={this.props.icon}></i>
		</div>
        
        );
    }
});