/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    Event = require('./Event.jsx'),
        _ = require('lodash');

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
            navable: false,
            navStack: 0,
            classString: "col-md-12",
            eventSet: [],
            id: "events",
            eventType: "",
            events: [],
        }
    },
    render: function() {

        var eventSet = this.props.eventSet;

        var eventNodes = this.props.events.map(function (event, i) {
          return <Event eventSet={eventSet} eventType={event.type} key={i.id} username={event.username} action={event.activity} game={event.game} />
        });


        return (

            <div className={this.props.classString} id={this.props.id}>

                {eventNodes}

            </div> 

        );
    }
});