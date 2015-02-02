/**
* @jsx React.DOM
*/

var React               = require('react/addons'),
    _                   = require('lodash'),
    moment              = require('moment'),
    api                 = require('socket.io-client')('/api'),
    navigationInit      = require('../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            achievement: {
                title: "Sample Title",
                description: "Sample Description",
                count: false,
                single: true
            }
        };
    },

    componentDidMount: function () {
        navigationInit.navigationDeinit();
    },

    render: function() {

        navigationInit.navigationDeinit();

        console.log(this.props.achievement.title);

    return (

        <div className="parent">

            <div className="icon-modal-container col-xs-3">
                <i className="ion-trophy"></i>
            </div>

            <div className="col-xs-9 achievement-title-container">

                <h3>Achievement Unlocked!</h3>
                <span className="modal-achievement-desc">{this.props.achievement.title}</span>
            </div>

        </div>

            );
        }

});
