/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    helpers         = require('../js/helpers'),
    api             = require('socket.io-client')('/api'),
    navigationInit  = require('../js/navigation.init'),
    mixins          = require('./mixins/mixins.jsx');

module.exports = React.createClass({

    mixins: [mixins.listener],

    getInitialState: function() {
        return {
            community: [{}]
        };
    },

    getDefaultProps: function() {
        return {
            id:             "panel_community",
            icon:           "ion-ios-people ",
            title:          "Community",
            imageStyles:    "",
            classString:    "slide col-xs-4",
            functionCall:   "moreCommunity"
        };
    },

    componentDidMount: function() {

        api.emit('request', { request: 'community'});
        
        navigationInit.navigationInit();

    },

    render: function() {

        var imageStyles = this.state.community[0].Styles;

        var component = this;

        helpers.preloadImage(this.state.community[0].Image, function() {
            document.getElementById("community_image").classList.remove("hidden");
        });

        return (

         <div className={this.props.classString}>

         <table className="table table-striped navable" data-function={this.props.functionCall} id={this.props.id}>

             <thead>
                    <th>
                        <h4> <i className={this.props.icon}></i></h4>
                    </th>

                    <th colSpan='2'>
                        <h4 className="text-right">{this.state.community.title ? this.state.community[0].title : "Community" }</h4>
                    </th>
             </thead>

            <tr>
                <td colSpan='2' className="rss_image">

                <br />

                  <span className="rImg"><img id="community_image" src={this.state.community[0].Image} className='img-responsive hidden' style={imageStyles} /></span>
                </td>
            </tr>

            <tr>
                <td colSpan='2' id="rss_info">
                    <br />
                    { this.state.community.subtitle ? <h4 className="rss_title pull-left"><i className='ion-speakerphone'></i> {this.state.community[0].subtitle}</h4> : null }
                    <span className="rss_author pull-right"></span>
                </td>
            </tr>

        </table>
        </div>


        );
    }
});

//
