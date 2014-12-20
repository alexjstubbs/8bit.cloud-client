/**
* @jsx React.DOM
*/

'use strict';

var React            = require('react/addons')
,   helpers          = require('../js/helpers')
,   api              = require('socket.io-client')('/api')
,   navigationInit   = require('../js/navigation.init');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            community: [{
                title: null,
                Image: null,
                URL: null,
                rss: null,
                Styles: null,
                description: null
            }],
            url: "http://www.racketboy.com/forum/viewtopic.php?f=33&t=47942"
        }
    },

    componentDidMount: function() {

        api.emit('request', { request: 'community'});
        api.on('api', this.setState.bind(this));

        navigationInit.navigationInit();

    },

    render: function() {

        var ta = document.getElementById('community-info');

        if (this.state.community[0].description) {
            ta.innerHTML = this.state.community[0].description;
        }

        return (

            <div className="parent">

                <div className="form-group">


                    <span className='col-xs-12'>
                        <img src={this.state.community[0].Image} className="community-img img-responsive" />
                    </span>


                    <div className="clearfix"></div>

                    <div id="community-info" className="form-control navable scrollable-view">

                    </div>

                        <button className="col-xs-4 btn btn-alt btn-alt-size navable" data-function="launchBrowser" data-parameters={this.state.url}><i className='ion-chatboxes'></i> &nbsp; Join the Discussion</button>
                        <button className="col-xs-4 btn btn-alt btn-alt-size navable"><i className='ion-help'></i> &nbsp; About the Club</button>
                        <button className="col-xs-3 btn btn-alt btn-alt-size navable red-bg _offset1" data-function="closeDialog"><i className='ion-close'></i> &nbsp; Close</button>

                    <div className="clearfix"></div>

                    <br />

                </div>




            </div>

        );
    }
});
