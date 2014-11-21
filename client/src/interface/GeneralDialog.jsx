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
            body: "(001): A General Unspecified Error Occured. Refer to log file for more information."
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

            <div className="parent" id="general-dialog">


            <i className='ion-loading-c'></i>

                <h2><i className={type.icon}></i> &nbsp; {type.text}</h2>

                <hr />

                <p className="well">{this.props.body}</p>

                <button data-function={this.props.dataFunction} className="navable btn btn-block btn-lg btn-alt">{type.button}</button>


            </div>

        );
    }
});