/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    navigationInit   = require('../js/navigation.init');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
                url: "http://ignition.io",
                id: "web-frame"
            };
    },

    componentDidMount: function() {

        navigationInit.navigationInit();


        // document.getElementsByTagName("iframe")[0].focus();
    },



    render: function() {
    
        var _domain = this.props.url.split("/");

        // Illegal on some renderers
        // TODO: use other method

        document.domain = _domain[2].replace("www.","");

        return (
            <div className="parent">

            <form>
                <div className="col-xs-10">
                    <input id="url-bar" type="text" className="input-lg navable form-control" data-function="inputFocus" value={this.props.url} />
                </div>

                <button className="up5 btn-alt btn col-xs-1 btn-alt-font btn-alt-size navable" data-function="gotoUrl">GO  <i className="ion-angle-right"></i></button>
            </form>

            <div className="clearfix"></div>

            <iframe id={this.props.id} src={this.props.url} className="navable browser-frame" data-function="browserFocus" data-parameters={this.props.id}></iframe>


            <hr />

            <button className="navable btn btn-alt btn-alt-size pull-left" data-function="mouseControlEnable"><i className='ion-wand'></i> &nbsp; Enable Mouse</button>

            <button className="navable btn btn-alt btn-alt-size pull-right red-bg" data-function="closeDialogDisableMouse"><i className='ion-close'></i> &nbsp; Close Browser</button>

            </div>


        );
    }
});
