/**
 * @jsx React.DOM
 */

'use strict';

var React  = require('react/addons');

module.exports = React.createClass({

    getInitialState: function() {
        return {secondsElapsed: 0};
    },

    tick: function() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    },

    componentDidMount: function() {
        this.interval = setInterval(this.tick, 100);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render: function() {
        return (
            <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
    }

});
