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
            body: "General Error (001)"
        }
    },

    componentDidMount: function() {
        
        navigationInit.navigationInit();

    },

    render: function() {

       var _this = this;

        var type = {
            0: function() {
                _this.setProps.dataFunction = "closeDialog";
                return {icon: "ion-close-circled", title: "Oops! We've encountered an error!", button: "Close"};
            },

            1: function() {
                _this.setProps.dataFunction = "closeDialog";
                return {icon: "ion-information-circled", text: "Important Information", button: "Close"};
            },

            2: function() {
                _this.setProps.dataFunction = "closeDialog";
                return {icon: "ion-alert", text: "Warning!", button: "Ok, Got it!"};
            }
        }

        var type = type[this.props.type]();

        return (

            <div className="parent">

                <h1><i className={type.icon}></i> {type.text}</h1>

                <p>{this.props.body}</p>

                <button data-function={this.props.dataFunction} className="navable btn btn-block btn-lg btn-alt">{type.button}</button>


            </div>

        );
    }
});