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
                Avatar: <i className="ion-person"></i>
            }
        }
    },

    componentDidMount: function() {

        console.log(this.state.session.Avatar);
        api.emit('request', { request: 'sessionProfile', param: null});
        api.on('api', this.setState.bind(this));

    },

    render: function() {


        var Avatar;

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
            'pull-left': true,
            'col-md-2': true
        });

        return (
             <div>
                <div>
                    <div className="col-md-4">
                    <div className={classes}>
                        {Avatar ? <img src={this.state.session.Avatar} className='img-responsive' /> : this.state.session.Avatar}
                    </div>
                    <div className="hello col-md-8">
                        <h3 className="nopadding">Welcome, {this.props.username} <span className="muted"></span></h3>
                        <NetworkStatus />
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
