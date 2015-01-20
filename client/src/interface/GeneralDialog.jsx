/**
 * @jsx React.DOM
 */

var React           = require('react/addons')
,   navigationInit  = require('../js/navigation.init')
,   _               = require('lodash');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            navable: true,
            type: 0,
            dataFunction: "closeDialog",
            classList: 'col-xs-12',
            body: "(001): A General Unspecified Error Occured. Refer to log file for more information.",
            button: "Close Dialog",
            url: "http://ignition.io/help"
        }
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    render: function() {


       var _this = this;

        var type = {
            0: function() {
                return {icon: "ion-close-circled", title: "Oops! We've encountered an error!" };
            },

            1: function() {
                return {icon: "ion-information-circled", text: "Important Information" };
            },

            2: function() {
                return {icon: "ion-alert", text: "Warning!" };
            }
        }

        var type = type[this.props.type]();

        return (

            <div className="parent" id="general-dialog">

                <h2><i className={type.icon}></i> &nbsp; {type.text}</h2>

                <hr />

                <p className="well-alt">{this.props.body}</p>

                <span className="alert hidden"><i className="ion-document-text"></i> &nbsp; {this.props.url}</span>

                <button data-function={this.props.dataFunction} data-parameters={this.props.dataParameters} className="navable btn btn-block btn-lg btn-alt">{this.props.button}</button>


            </div>

        );
    }
});
