/**
 * @jsx React.DOM
 */

'use strict';

var React   = require('react/addons')
,    _      = require('lodash')
,   Step    = require('./Step.jsx')
,   active;

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            steps: 5,
            active: 2
        };
    },

    render: function() {

        var stepNodes = [];

        for (var i=0; i < this.props.steps; i++) {

            if (i == this.props.active) {
                active = true;
                console.log("OK");
            }

            else {
                active = false;
            }

            stepNodes.push(<Step active={active} key={i} />);
        }

        return (
      
            <nav>
              <ul className="pagination">
                {stepNodes}
              </ul>
            </nav>
 

        );
    }
});
