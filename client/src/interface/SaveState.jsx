/**
 * @jsx React.DOM
 */

/* TODO: Get event listener to update state correctly on newly stored games.
-------------------------------------------------- */

'use strict';

var React  = require('react/addons'),
    api    = require('socket.io-client')('/api'),
    _      = require('lodash'),
    _filename;

module.exports = React.createClass({

    render: function() {

        return (

            <div className="col-xs-4">
               <a href="#">
               <div className="no-screenshot save-slot navable" data-function="loadSave" data-parameters={this.props.filepath}><i className='mute icon ion-android-image'></i></div>
               </a>
               <div className='slot-number'>Slot {this.props.slot}</div>
            </div>

        )
    }
});
