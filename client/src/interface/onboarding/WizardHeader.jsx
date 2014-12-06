/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons')
,   Pagination      = require('./Pagination.jsx');

module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            title: "Welcome",
            subtitle: "Set Up",
            steps: 3,
            active: 0,
            icon: null
        }
    },

    render: function() {

        return (
      
            <div className="container">

                <div id="welcome" className="col-sm-12">

                    <div className="col-sm-7 pull-left">

                        <h1>{this.props.title}</h1>

                        <Pagination steps={this.props.steps} active={this.props.active} />

                    </div>


                    <div className="col-sm-5 text-right">

                        <h1 className="welcome-subtitle"><i className={this.props.icon} /> {this.props.subtitle}</h1>
                        
                    </div>

                    <div className="clearfix"></div>

                    <br />

                </div>

            </div>

        );
    }
});