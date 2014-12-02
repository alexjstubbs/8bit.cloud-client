/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            status: 0,
            button: "Create Your Profile"
        }
    },
    

    getDefaultProps: function() {
        return {
			child: true,
			functionCall: "nextScreen",
			internetConnected: null,
			ssid: null,
			networkInfo: [],
			status: 0

        }
    },

    render: function() {

	    var _this = this;

        var states = {
            0: function() {
                return {icon: "ion-looping purple", text: "Checking Internet Connection...", button: null};
            },

            1: function() {
                document.getElementById("network-next").classList.remove("hidden");
                _this.setProps.dataFunction = "viewMessages";
                return {icon: "ion-checkmark-circled green", text: "You are connected to the internet!", button: "Create a New Profile"};
            },

            2: function() {
                document.getElementById("network-next").classList.remove("hidden");
                _this.setProps.dataFunction = "networkSettings";
                return {icon: "ion-close-circled red", text: "Cannot establish internet connection...", button: "Configure Network Settings..."};
            }
        }

        var status = states[this.props.status]();

        return (
	    

	        <div>
	        	<div className="welcome-internet">

					<p>
					   <i className={status.icon}></i> {status.text}
					</p>

				</div>

				<br />

				<button id="network-next" data-function={this.props.functionCall} className="hidden navable btn pull-right btn-lg btn-alt">{status.button} &nbsp; <i className="ion-arrow-right-c"></i></button>

			</div>
				
        );
    }
});