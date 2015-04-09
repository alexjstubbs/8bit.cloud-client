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
    About           = require('./forms/About.jsx'),
    Calibration     = require('./ColorCalibration.jsx'),
    Gameplay        = require('./forms/Gameplay.jsx'),
    Gamepad         = require('./forms/Gamepad.jsx'),
    Interface       = require('./forms/Interface.jsx'),
    systemSettings  = require('../js/system.settings').settings,
    navigationInit  = require('../js/navigation.init'),
    mixins          = require('./mixins/mixins.jsx'),
    nodeUpdate      = 0,
    viewUpdate      = 0,
    curView,
    currentNode;

/* Components
-------------------------------------------------- */

module.exports = React.createClass({

    mixins: [mixins.listener, mixins.screenMount],

    getInitialState: function() {

        return {

            settingsObject: {},
            view: "Paths",
            screen: "Settings"

        };

    },

    componentDidUpdate: function() {

        if (typeof this.state.settingsObject.interface !== "undefined") {
            document.body.style.WebkitTransform = 'scale('+this.state.settingsObject.interface.zoom+')';
        }

        nodeUpdate++;

        // TODO: Fix this, this is weak.
        if (nodeUpdate == 3) {
            navigationInit.navigationInit();
        }

    },

    componentWillUpdate: function(props, state) {
            // console.log("state", state);

            var component = this;
            if (currentNode) {
                currentNode.props.settings = component.state.settingsObject;

            }

    },

    getDefaultProps: function() {
        return {
            screen: 'Settings',
            icons: {
                'paths':        'ion-filing',
                'interface':    'ion-easel',
                'gamepad':      'ion-ios-game-controller-b',
                'network':      'ion-outlet',
                'server':       'ion-earth',
                'profiles':     'ion-person-stalker',
                'gameplay':     'ion-monitor',
                'calibration':  'ion-ios-color-filter',
                'about':        'ion-ios-help'
            }
        };
    },

    screenMount: function() {
        nodeUpdate++;

        this.setState({view: "Paths" });
        this.changeView(this.state.view);

    },

    changeView: function(view) {

        var component = this;

        view = view.charAt(0).toUpperCase() + view.slice(1);
        curView = view;

        systemSettings.refresh();

        this.setState({view: view });

        switch (view) {

            case "Paths":
                currentNode = <Paths settings={component.state.settingsObject} title={view} />;
                break;

            case "Interface":
                currentNode = <Interface settings={component.state.settingsObject} title={view} />;
                break;

            case "Gamepad":
                currentNode = <Gamepad gamepad={component.state.gamepad} settings={component.state.settingsObject} title={view} />;
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

            case "Calibration":
                currentNode = <Calibration settings={component.state.settingsObject} title={view} />;
                break;

            case "About":
                currentNode = <About settings={component.state.settingsObject} title={view} />;
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

        var component = this;



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

                        <button data-function="setupWizard" className="navable btn btn-alt btn-block"><i className="ion-ios-color-wand"></i> &nbsp; Setup Wizard</button>

                    </div>

                    <div id="settings-container" className="col-xs-9">

                        <h1 className="text-right">{this.state.view} Settings &nbsp; <i className="ion-ios-settings-strong"></i></h1>

                        <hr />

                            {currentNode}

                    </div>
            </div>
        )
    }
});
