/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   navigationInit  = require('../../js/navigation.init');

module.exports = React.createClass({

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

        navigationInit.navigationInit();

    },

    render: function() {

        var type = 1;

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


                                <button className="btn btn-lg btn-alt btn-left-align btn-block navable" data-function='writeWifiConfig' data-parameters={this.props.form}><i className="ion-android-sync green pull-left"></i> &nbsp; Test Wireless Configuration</button>
                                <button className="btn btn-lg btn-alt btn-left-align btn-block navable" data-function='openDialog' data-parameters={type}><i className="ion-close-circled red pull-left"></i> &nbsp; Continue Offline</button>

                                <br />
                                <br />

                                <button className="btn btn-lg btn-alt btn-left-align btn-block navable" data-function='saveWifi' data-parameters={this.props.form}><i className="ion-settings red pull-left"></i> &nbsp; Advanced Set Up</button>


                                <input type="hidden" name="server" value={this.props.server} />
                                <input type="hidden" name="filename" value={this.props.filename} />

                            </fieldset>
                            </form>


                        </div>
                    </div>



        );
    }
});
