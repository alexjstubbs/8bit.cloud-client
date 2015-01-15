/**
* @jsx React.DOM
*/

var React           = require('react/addons');

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


    render: function() {

        var classname;

        if (this.props.require) {
            classname = "label-selected required";
        }

        return (

            <div className="scroll-into-view">

                <span className="hidden">{this.props.desc}</span>

                <span className="col-xs-2 scroll-into-view">
                    <span id={this.props.id} className={classname + " navable label label-unselected"} data-function="selectBox" data-parameters={this.props.id}>{this.props.arg}</span>
                </span>

                <span className="col-xs-10 scroll-into-view">
                    <input id={"input-"+this.props.id} className="form-control input-lg navable" type="text" data-function="inputFocus" name={this.props.arg} value={this.props.default} />
                </span>

            </div>

        );
    }
});
