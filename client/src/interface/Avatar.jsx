/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   NetworkStatus   = require('./NetworkStatus.jsx')
,   api             = require('socket.io-client')('/api');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            session: {
                Avatar: <i className='ion-person'></i>
            }

        }
    },

    componentDidMount: function() {

        api.emit('request', { request: 'sessionProfile', param: null});
        api.on('api', this.setState.bind(this));

    },

    render: function() {

        var Avatar;

        Avatar = true;

        if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.state.session.Avatar)) {
            Avatar = true
        }

        else {
            Avatar = false;
        }

        var cx = React.addons.classSet;
        var classes = cx({
            'avatared': Avatar,
            'square': true,
            'pull-left': true
        });

        return (

            <div className={classes}>
                {Avatar ? <img src={this.state.session.Avatar} className='img-responsive' /> : <i className='ion-person'></i>}
            </div>
        );
    }
});
