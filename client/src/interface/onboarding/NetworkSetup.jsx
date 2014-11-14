/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   WizardHeader    = require('./WizardHeader.jsx')
,   api             = require('socket.io-client')('/api');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            status: 0,
            button: "Create Your Profile"
        }
    },

    componentDidMount: function() {
        api.on('api', this.setProps.bind(this));

        var _this = this;
        window.addEventListener("view", function(e) { 
            if (e.detail.screen == _this.props.screen) {
                _this.screenMount();
            };
        })

    },

    screenMount: function() {
        api.emit('request', { request: 'sysIsOnline'});
        api.emit('request', { request: 'sysGetNetwork'});
    },

    getDefaultProps: function() {
        return {
            screen: "NetworkSetup",
            internetConnected: null,
            ssid: null,
            networkInfo: []

            // {
            //   "ip": "162.204.117.255",
            //   "hostname": "No Hostname",
            //   "city": "Alpharetta",
            //   "region": "Georgia",
            //   "country": "US",
            //   "loc": "34.0204,-84.2445",
            //   "org": "AS7018 AT&T Services, Inc.",
            //   "postal": "30022"
            // }

        }
    },

    componentWillReceiveProps: function(props) {
        if (props.internetConnected == 'connected') {
            this.state.status = 1;
        }

        if (props.internetConnected == 'disconnected') {
            this.state.status = 2;
        }
    },

    render: function() {

        var states = {
            0: function() {
                return {icon: "ion-looping purple", text: "Checking Ineternet Connection", button: null};
            },

            1: function() {
                document.getElementById("network-next").classList.remove("hidden");
                return {icon: "ion-checkmark-circled green", text: "You are connected to the internet!", button: "Create Your Profile"};
            },

            2: function() {
                document.getElementById("network-next").classList.remove("hidden");
                return {icon: "on-close-circled red", text: "Cannot establish connection...", button: "Network Settings..."};
            },
        }

        var status = states[this.state.status]();

        return (
      
            <div className="container parent" id="network-settings">

                <WizardHeader title="Welcome" icon="ion-wifi" subtitle="Network Setup" active="1" steps="4" />

                <div className="welcome-internet">
                    <p>
                       <i className={status.icon}></i> {status.text}
                    </p>

                </div>
            
                <br />

                <button id="network-next" className="hidden navable btn btn-block btn-lg btn-alt">{status.button}</button>

            </div>

        );
    }
});