/**
 * @jsx React.DOM
 */

var React           = require('react/addons'),
    api                 = require('socket.io-client')('/api'),
    navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            status: 0
        }
    },

    getDefaultProps: function() {

    return {
            navable: false,
            navStack: 2,
            form: 'Wifi.json',
            path: 'config',
            // /etc/wpa_supplicant/wpa_supplicant.conf
            server: false,
            classList: 'col-xs-12'
        }
    },

    componentDidMount: function() {

        api.emit('request', { request: 'sysIsOnline'});

        api.on('api', this.setState.bind(this));

        navigationInit.navigationInit();

    },

    componentWillUpdate: function(props, state) {
        if (state.internetConnected == 'connected') {
            this.state.status = 1;
        }

        if (state.internetConnected == 'disconnected') {
            this.setstate.status = 2;
        }
    },

    render: function() {

        var type = 1,
            nextButton;

        if (this.state.internetConnected == "connected") {
            nextButton = <button className="btn btn-lg btn-alt btn-left-align btn-block navable" data-function='nextScreen' data-parameters={type}><i className="ion-person-add green pull-left"></i> &nbsp; Setup new Profile</button>;
        }

        else {
            nextButton = <button className="btn btn-lg btn-alt btn-left-align btn-block navable" data-function='openDialog' data-parameters={type}><i className="ion-close-circled red pull-left"></i> &nbsp; Continue Offline</button>
        }

        return (

                    <div className="row-fluid ">
                        <div className="col-xs-12">

                            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>


                                <fieldset>

                                    <div className="form-group">

                                        <input id="wifi-adapter" className="form-control input-lg navable" data-function='inputFocus' placeholder="wlan0" value="wlan0" name="wifi-adapter" type="text" />
                                        <input className="form-control input-lg navable" data-function='inputFocus' placeholder="WPA-PSK" value="WPA-PSK" name="key_mgmt" type="text"  />

                                    </div>

                                    <hr />

                                    <div className="form-group">

                                        <input className="form-control input-lg navable defaultSelection" data-function='inputFocus' placeholder="Enter your SSID" name="ssid" type="text" />
                                        <input className="form-control input-lg navable" data-function='inputFocus' placeholder="Enter your Password/Passphrase" name="passphrase" type="text"  />

                                    </div>


                                <button className="btn btn-lg btn-alt btn-left-align btn-block navable" data-function='writeWifiConfig' data-parameters={this.props.form}><i id="tester-spin" className="ion-android-sync green pull-left"></i> &nbsp; Test Wireless Configuration</button>
                                <button className="btn btn-lg btn-alt btn-left-align btn-block navable" data-function='showTerminal' data-parameters={this.props.form}><i className="fa fa-terminal pull-left"></i> &nbsp; Open a Terminal</button>


                                <br />
                                <br />

                                {nextButton}

                            </fieldset>
                            </form>


                        </div>
                    </div>



        );
    }
});
