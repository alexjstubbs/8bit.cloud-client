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

                <button data-function="navigationPrevRow" className="navable btn btn-alt"><i className="ion-close"></i> &nbsp; Cancel Changes</button>
                <button className="navable btn btn-alt"><i className="ion-checkmark"></i> &nbsp; Save Changes</button>

            </div>

        );
    }
});
