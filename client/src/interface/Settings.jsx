/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    _               = require('lodash'),
    api             = require('socket.io-client')('/api'),
    Paths           = require('./forms/Paths.jsx'),
    Interface       = require('./forms/Interface.jsx'),
    systemSettings  = require('../js/system.settings').settings,
    navigationInit  = require('../js/navigation.init'),
    mixins          = require('./mixins/mixins.jsx'),
    nodeUpdate      = 0,
    currentNode;

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

    },

    componentDidUpdate: function() {

        nodeUpdate++;

        if (nodeUpdate == 3) {
            navigationInit.navigationInit();
        }
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
        nodeUpdate++;
    },

    changeView: function(view) {

        var component = this;

        view = view.charAt(0).toUpperCase() + view.slice(1);

        switch (view) {
            case "Paths":
                currentNode = <Paths />;
                break;
            case "Interface":
                currentNode = <Interface />;
                break;
            default:
                currentNode = <Paths />;
                break;
        }

        component.forceUpdate();

    },

    componentDidMount: function() {

        nodeUpdate++;

        var component = this;

        systemSettings.refresh();

        window.addEventListener("changeView", function(e) {
              component.changeView(e.detail.view);
        });


    },

    render: function() {

        if (!currentNode) {
            currentNode = <Paths />;
        }

        var component = this,
            settingsParents = _.keys(this.state.settingsObject),
            settingsMenuMarkup = settingsParents.map(function (parent, i) {

                return <li><button data-highlightfunction='throwMe' data-function="navigationNextRow" data-parameters={parent} className="btn btn-block btn-nobg btn-left-align btn-alt btn-sm navable navable-row"><i className={component.props.icons[parent]}></i> &nbsp; <span>{parent}</span></button></li>;

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

                            {currentNode}

                    </div>
            </div>
        )
    }
});
