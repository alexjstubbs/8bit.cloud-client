/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react/addons'),
    _               = require('lodash'),
    api             = require('socket.io-client')('/api'),
    Paths           = require('./forms/Paths.jsx'),
    Network         = require('./forms/Network.jsx'),
    Profiles        = require('./forms/Profiles.jsx'),
    Gameplay        = require('./forms/Gameplay.jsx'),
    Interface       = require('./forms/Interface.jsx'),
    systemSettings  = require('../js/system.settings').settings,
    navigationInit  = require('../js/navigation.init'),
    mixins          = require('./mixins/mixins.jsx'),
    nodeUpdate      = 0,
    curView,
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

    componentDidUpdate: function() {

        nodeUpdate++;

        // TODO: Fix this, this is weak.
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
        curView = view;

        systemSettings.refresh();

        switch (view) {

            case "Paths":
                currentNode = <Paths settings={component.state.settingsObject} title={view} />;
                break;

            case "Interface":
                currentNode = <Interface settings={component.state.settingsObject} title={view} />;
                break;

            case "Network":
                currentNode = <Network settings={component.state.settingsObject} title={view} />;
                break;

            case "Profiles":
                currentNode = <Profiles settings={component.state.settingsObject} title={view} />;
                break;

            case "Gameplay":
                currentNode = <Gameplay settings={component.state.settingsObject} title={view} />;
                break;

            default:
                currentNode = <Paths settings={component.state.settingsObject} title={view} />;
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
            currentNode = <Paths settings={this.state.settingsObject} title ="Paths" />;
        }

        if (_.isEmpty(currentNode.props.settings)) {
            currentNode = <Paths settings={this.state.settingsObject} title ="Paths" />;
        }


        var component = this,
            settingsParents = _.keys(this.state.settingsObject),
            settingsMenuMarkup = settingsParents.map(function (parent, i) {

                return <li><button data-highlightfunction='showChildren' data-function="navigationNextRow" data-parameters={parent} className="btn btn-block btn-nobg btn-left-align btn-alt btn-sm navable navable-row"><i className={component.props.icons[parent]}></i> &nbsp; <span>{parent}</span></button></li>;

            });

        return (

            <div id="settings" className="parent">

                    <div id="settings-sidebar" className="col-xs-3">
                        <ul>
                            {settingsMenuMarkup}
                        </ul>

                        <br />

                        <button className="navable btn btn-alt btn-block"><i className="ion-ios-color-wand"></i> &nbsp; Setup Wizard</button>
                    </div>

                    <div id="settings-container" className="col-xs-9">

                        <h1 className="text-right">{curView} Settings &nbsp; <i className="ion-ios-settings-strong"></i></h1>

                        <hr />

                            {currentNode}

                    </div>
            </div>
        )
    }
});
