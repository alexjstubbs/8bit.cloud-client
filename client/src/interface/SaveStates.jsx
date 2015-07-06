/**
 * @jsx React.DOM
 */

/* TODO: Get event listener to update state correctly on newly stored games.
-------------------------------------------------- */

'use strict';

var React     = require('react/addons'),
    api       = require('socket.io-client')('/api'),
    _         = require('lodash'),
    mixins    = require('./mixins/mixins.jsx'),
    SaveState = require('./SaveState.jsx'),
    _filename;

module.exports = React.createClass({

  mixins: [mixins.listener],

  getInitialState: function() {
          return {
            "slot": 1,
            "saveStates": []
        };
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(props, state) {

        if (!_filename) {
            _filename = props.filename;
        }

        else {
            if (props.filename != _filename) {
                api.emit('request', { request: 'listSaveStates', param: this.props.filename});
            }
        }

    },

    render: function() {

        var saveNodes = this.state.saveStates.map(function (state, i) {

            var slot = state.substr(state.length - 1);
            if (slot == "e" || isNaN(slot)) { slot = "1"; }

            return <SaveState slot={slot} filepath={state} />
        });


        return (

             <div className="col-xs-5 pull-left" id="profile-saves">
               <div className="row">
                 {saveNodes}
               </div>
            </div>

        )
    }
});
