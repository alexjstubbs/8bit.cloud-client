/**
* @jsx React.DOM
*/

var React           = require('react/addons')
,   _               = require('lodash')
,   NetworkStatus   = require('./NetworkStatus.jsx')
,   navigationInit  = require('../js/navigation.init');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            message: null
        }
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    getDefaultProps: function() {

        return {
            navable: true,
            navStack: 2,
            From: null,
            Avatar: <div className="col-md-3 pull-left square dark-gray"><i className='ion-person'></i></div>,
            Body: "No Content",
            messageId: null,
            Type: "Message"
        }
    },

    render: function() {

        var message = JSON.parse(this.props.message);
        return (

            <div className="parent">

                {message.Body}

                <hr />

                <button className="navable btn btn-alt btn-alt-size">Close Message</button>
                <button className="navable btn btn-alt btn-alt-size">Delete Message</button>
                <button className="navable btn btn-alt btn-alt-size">Reply</button>

            </div>

        );
    }
});
