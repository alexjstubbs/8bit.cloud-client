/**
* @jsx React.DOM
*/

var React            = require('react/addons')
,   navigationInit   = require('../js/navigation.init')
,   subfield
,   defaults;

module.exports = React.createClass({

    getDefaultProps: function() {

        return {
            id: null,
            arg: null,
            desc: null,
            default: null,
            require: false

        }
    },

    componentDidMount: function() {

        component = this;

        if (!this.props.subfield) {

            document.getElementById("input-"+this.props.id).classList.add("no-sub-field");
            document.getElementById("input-"+this.props.id).setAttribute("data-function", "preventDefault");

            component.forceUpdate();

        }

        navigationInit.navigationInit();

    },

    render: function() {

        if (defaults != 'true') {
            defaults = this.props.default;
        }

        var classname;

        if (this.props.require) {
            classname = "label-selected required";
        }

        if (this.props.selected) {
            classname = "label-selected";
        }

        return (

            <div className="scroll-into-view">

                <span className="hidden">{this.props.desc}</span>

                <span className="col-xs-2 scroll-into-view">
                    <span id={this.props.id} className={classname + " navable label label-unselected"} data-function="selectBox" data-parameters={this.props.id} data-identifier='selectBoxConfig'>{this.props.arg}</span>
                </span>

                <span className="col-xs-10 scroll-into-view">
                    <input id={"input-"+this.props.id} className="form-control input-lg navable" type="text" data-function="inputFocus" name={this.props.arg} value={defaults} />
                </span>

            </div>

        );
    }
});
