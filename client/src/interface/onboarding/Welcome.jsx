/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   _               = require('lodash')
,   Pagination      = require('./Pagination.jsx');

module.exports = React.createClass({
    getDefaultProps: function() {
    return {

        }
    },

    componentDidMount: function() {

    },

    render: function() {

        return (
      
            <div className="container">

                <div id="welcome" className="col-sm-12">

                    <div className="col-sm-5 pull-left">

                        <h1>Welcome</h1>

                        <br />
                        
                        <Pagination />

                    </div>


                    <div className="col-sm-5 text-right">

                        <h1>Set Up</h1>
                        
                    </div>

                    <div className="clearfix"></div>

                    <hr />

                </div>

            </div>

        );
    }
});