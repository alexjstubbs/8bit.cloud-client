/**
 * @jsx React.DOM
 */

'use strict';

var React               = require('react/addons')
,   _                   = require('lodash')
,   api                 = require('socket.io-client')('/api')
,   NetworkStatus       = require('./NetworkStatus.jsx')
,   WifiConfiguration   = require('./WifiConfiguration.jsx')
,   WifiAdvanced        = require('./WifiAdvanced.jsx');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            view: "NetworkStatus"
        }
    },

    componentWillReceiveProps: function(props) {
        if (props.internetConnected == 'connected') {
            this.state.status = 1;
            sessionStorage.setItem("navigationState", "pauseLeft");
        }

        if (props.internetConnected == 'disconnected') {
            this.state.status = 2;
            sessionStorage.setItem("navigationState", "pause");
        }
    },

    screenMount: function() {
        api.emit('request', { request: 'sysIsOnline'});

        // api.emit('request', { request: 'sysGetNetwork'});
    },

    changeView: function(view) {
         this.setState({view: view});
    },

    componentDidMount: function() {
 

        api.on('api', this.setProps.bind(this));

        var _this = this;

        window.addEventListener("mountView", function(e) { 
            if (e.detail.screen == _this.props.screen) {
                _this.screenMount();
            };
        });

        window.addEventListener("changeView", function(e) { 
                _this.changeView(e.detail.view);
        });

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

    render: function() {

        var ChildNode;


        switch (this.state.view) {
         
            case "NetworkStatus":
                ChildNode = <NetworkStatus status={this.state.status} />
                break;
            
            case "WifiConfiguration":
                ChildNode = <WifiConfiguration />
                break; 

            case "WifiAdvanced":
                ChildNode = <WifiAdvanced />
                break;

            default:
                ChildNode = <NetworkStatus status={this.state.status} />
        }

        return (
      
            <div className="container parent" id="network-settings">

                {ChildNode}

            </div>

        );
    }
});