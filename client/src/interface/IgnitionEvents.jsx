/**
 * @jsx React.DOM
 */

'use strict';

var React   = require('react/addons')
,   Event   = require('./Event.jsx')
,   api     = require('socket.io-client')('/api')
,   _       = require('lodash');

module.exports = React.createClass({

  getInitialState: function() {
            return {
                 events: [{
                    Type: null,
                    Append: null,
                    Git: null,
                    Hash: null
                }],

                eventSet: [{

                }]
        }
    },
    componentDidMount: function() {

        api.emit('request', { request: 'getSet', param: 'event'});
        api.emit('request', { request: 'events'});
        api.on('api', this.setState.bind(this));

    },

    getDefaultProps: function() {
    return {
            navable: false,
            navStack: 0,
            classString: "col-xs-12",
            eventSet: [],
            id: "events",
            eventType: "",
        }
    },
    render: function() {

        var eventSet = this.state.eventSet;

        var eventNodes = this.state.events.map(function (event, i) {
          return <Event key={i.id} eventSet={eventSet} eventType={event.Type} eventAppend={event.Append} eventGit={event.Git} eventHash={event.Hash} />
        });



        return (

            <div className={this.props.classString} id={this.props.id}>

                {eventNodes}

            </div>

        );
    }
});
