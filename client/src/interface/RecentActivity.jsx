/**
 * @jsx React.DOM
 */

var React = require('react/addons'),
    Activity = require('./Activity.jsx'),
    _ = require('lodash'),
    moment = require('moment')
    api = require('socket.io-client')('/api');


module.exports = React.createClass({

    getInitialState: function() {
        return {

            activities: [

            ]

        };
    },

    getDefaultProps: function() {

    return {
            activities: [],
            navable: true,
            navStack: 2,
            icon: "ion-ios-people ",
            functionCall: "highlightPanel",
            functionParams: "panel_activity",
            classString: "slide col-xs-4",
            stackLength: 4,
            actionSet: [],
            id: "recent_activity",
            title: "Recent Activity",
            items: [],
        }
    },

    componentDidMount: function() {


        api.emit('request', { request: 'getActivities'});
        // api.on('api', this.setState.bind(this));

        api.on('network-api', this.setState.bind(this));

    },

    render: function() {

        var actionSet = this.props.actionSet;

        var activityNodes = this.state.activities.map(function (activity, i) {
          return <Activity actionSet={actionSet} key={i.id} navStack={i+1} username={activity.username} action={activity.activity} game={activity.game} timestamp={ activity.Timestamp } />
        });

        return (

            <div className={this.props.classString} id={this.props.id}>
                <table className="table navable" data-function={this.props.functionCall} data-parameters={this.props.functionParams} id="panel_activity">
                    <thead>
                        <th>
                            <h4> <i className={this.props.icon}></i></h4>
                        </th>

                        <th colSpan='2'>
                          <h4 className="text-right">{this.props.title}</h4>
                        </th>
                    </thead>
                    <tbody>

                        { activityNodes }

                   </tbody>
                    </table>
                </div>

        );
    }
});
