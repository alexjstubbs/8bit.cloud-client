/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    _               = require('lodash'),
    api             = require('socket.io-client')('/api'),
    Paths           = require('./forms/Paths.jsx'),
    systemSettings  = require('../js/system.settings').settings,
    navigationInit  = require('../js/navigation.init'),
    mixins          = require('./mixins/mixins.jsx');

/* Components
-------------------------------------------------- */

module.exports = React.createClass({

    mixins: [mixins.listener, mixins.screenMount],

    getInitialState: function() {
        return {

            settingsObject: {},

        };
    },


    componentWillUpdate: function(props, state) {

        navigationInit.navigationInit();

    },

    componentDidUpdate: function() {

    },

    getDefaultProps: function() {
        return {
            screen: 'Settings',
            icons: {
                'paths':        'ion-filing',
                'interface':    'ion-easel',
                'controls':     'ion-ios-game-controller-b',
                'network':      'ion-outlet',
                'server':       'ion-earth',
                'profiles':     'ion-person-stalker',
                'gameplay':     'ion-monitor'
            }
        };
    },

    screenMount: function() {
    },

    componentDidMount: function() {

        systemSettings.refresh();

    },

    render: function() {

        var component = this,
            settingsParents = _.keys(this.state.settingsObject),
            settingsMenuMarkup = settingsParents.map(function (parent, i) {

            return <li><button data-function="navigationNextRow" data-parameters={parent} className="btn btn-block btn-nobg btn-left-align btn-alt btn-sm navable navable-row"><i className={component.props.icons[parent]}></i> &nbsp; <span>{parent}</span></button></li>;

        });

        return (

            <div id="settings" className="parent">

                    <div id="settings-sidebar" className="col-xs-3">
                        <ul>
                            {settingsMenuMarkup}
                        </ul>
                    </div>

                    <div id="settings-container" className="col-xs-9">

                        <h1 className="text-right"><i className="ion-ios-settings-strong"></i> &nbsp;  Settings</h1>

                        <hr />
                        <br />

                            <Paths />

                    
                    </div>
            </div>
        )
    }
});
