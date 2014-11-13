/**
 * @jsx React.DOM
 */

'use strict';

var React   = require('react/addons')
,    _      = require('lodash');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            active: 0
        };
    },

    render: function() {

    	var active
    	, 	inactive;

    	if (this.props.active) {
    		active 		= true;
    		inactive 	= false;
    	}

    	else {
    		active 		= false;
    		inactive 	= true;
    	}

        var cx = React.addons.classSet;
        
        var classes = cx({
            'active': active,
            'ion-ios7-circle-filled': active,
            'ion-ios7-circle-outline': inactive,
        });


        return (
			<li><a href="#"><i className={classes}></i></a></li>
        );
    }
});



