/**
 * @jsx React.DOM
 */

'use strict';

var React  = require('react/addons');




module.exports = React.createClass({


    getInitialState: function() {
        return {
            _secondsElapsed: 0,
            secondsElapsed: 0
            };
    },

    tick: function() {

        // This is a quick hack, please forgive me
        // TODO: Port the timer to singular module for use in saving, charting. Share <module /> here

        String.prototype.toHHMMSS = function () {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = hours+':'+minutes+':'+seconds;
            return time;
        };
        
        var toStr = this.state._secondsElapsed.toString();

        this.setState({_secondsElapsed: this.state._secondsElapsed + 1 });
        this.setState({secondsElapsed: toStr.toHHMMSS() });
    },

    componentDidMount: function() {
        this.interval = setInterval(this.tick, 100);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render: function() {
        return (
            <div>{this.state.secondsElapsed}</div>
        );
    }

});
