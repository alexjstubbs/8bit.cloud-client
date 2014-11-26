/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');


module.exports = React.createClass({

	getDefaultProps: function() {
		return {
			value: null
		}
	},

    render: function() {

    	console.log(this.props.value);

        return (

            <span>

                <div className="form-control large-textarea"  contentEditable="true" id="placehold_input" name="textual" rows="10">
					<span id="keyboard-input-area">{this.props.value}</span> 
					<i className="cursor">_</i>
				</div> 

            </span>
        );
    }
});



