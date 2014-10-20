/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    Backdrop = require('./Backdrop.jsx');

module.exports = React.createClass({
    getDefaultProps: function() {
    return {
            navable: true,
            backdrop: false,
            classList: "ignition-modal systemNotificationContent",
            id: "ignition-popup",
            title: "Alert",
            message: "No error supplied?"
        }
    },
    
    render: function() {

        var backdrop;

        if (this.props.backdrop) {
            backdrop = <Backdrop /> 
        }

        return (

            <div>

                {backdrop}

                 <div className="container-fluid parent">
                    <div className="row-fluid">
                        <div className="col-xs-12">
                                    
                            <h2>
                                <span className='col-xs-11'>
                                {this.props.title}
                                </span>
                                
                                <span className='col-xs-1'>
                                <i className='ion-alert'></i></span>
                                </h2>
                            
                            <div className='clearfix'></div>
                            
                            <hr />
                            
                            <p>
                                {this.props.message}
                            </p>

                            <button className="btn btn-primary navable">CLOSE</button>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
});



