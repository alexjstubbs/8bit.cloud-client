/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons');

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
        };
    },
    render: function() {

        return (

            <div>

                <br />
                <hr />

                <span className="pull-left">
                    <button data-function="navigationPrevRow" className="navable btn btn-alt"><i className="ion-close"></i> &nbsp; Cancel Changes</button>
                </span>

                <span className="pull-right">
                    <button data-function="restoreConfig" className="navable btn red-bg btn-alt"><i className="ion-checkmark"></i> &nbsp; Restore Defaults</button>
                    <button data-function="updateConfig" data-parameters={this.props.form} className="navable btn btn-alt"><i className="ion-checkmark"></i> &nbsp; Save Changes</button>
                </span>

            </div>

        );
    }
});
