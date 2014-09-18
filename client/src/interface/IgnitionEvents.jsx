/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    Event = require('./Event.jsx'),
        _ = require('lodash');

module.exports = React.createClass({

  getInitialState: function() {
            return {
                 events: [{
                    Type: null,
                    Append: null,
                    Git: null,
                    Hash: null
                }]
        }
    },
    componentDidMount: function() {

        api.emit('request', { request: 'events'});
        api.on('api', this.setState.bind(this));
        api.on('api', function(e){
            console.log(e)
        });

    },

    getDefaultProps: function() {
    return {
            navable: false,
            navStack: 0,
            classString: "col-md-12",
            eventSet: [],
            id: "events",
            eventType: "",
        }
    },
    render: function() {

        var eventSet = this.props.eventSet;

        var eventNodes = this.state.events.map(function (event, i) {
            console.log(event);
          return <Event key={i.id} eventSet={eventSet} eventType={event.Type} eventAppend={event.Append} eventGit={event.Git} eventHash={event.Hash} />
        });



        return (

            <div className={this.props.classString} id={this.props.id}>

                {eventNodes}

            </div> 

        );
    }
});