/**
* @jsx React.DOM
*/

var React           = require('react/addons')
,   _               = require('lodash')
,   api             = require('socket.io-client')('/api')
,   navigationInit  = require('../js/navigation.init')
,   OptionNode      = require('./OptionNode.jsx')
,   navable
,   optionNodes
,   selected
,   launchContext   = {};

module.exports = React.createClass({

    getInitialState: function() {
        return {

        }
    },

    getDefaultProps: function() {

        return {
            software: "retroarch",
            form: 'retro',
            server: false,
            ensureExists: true,
            backdrop: true,
            server: "false",
            classList: 'col-xs-12',
            platform: null
        }
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

        api.emit('request', { request: 'getCommandlineConfig', param: this.props.payload });

        api.on('api', this.setState.bind(this));

    },

    componentWillUpdate: function(props, state) {

        document.addEventListener('selectBox', function eventHandler(e) {

            if (e.detail.el.classList.contains("no-sub-field")) {

                if (e.detail.el.value) {
                    e.detail.el.value = '';
                }
                else if (!e.detail.el.value) {
                    e.detail.el.value = 'true'
                }

            }

        });

        if (state.commandlineConfig) {

            if (Object.keys(state.commandlineConfig.arguements).length >= 5) {
                navable = "scroll-into-view scrollable-view";
            };

            var idPre = state.commandlineConfig.package;

            optionNodes = _.map(state.commandlineConfig.arguements, function(opt, i) {


                if (!opt.default) {

                    opt.default = null;
                    selected = false;

                }

                else {

                    if (opt.default === true) {
                        opt.default = null;
                    }

                    selected = true;
                }

                return <OptionNode selected={selected} id={idPre+i} arg={opt.arg} desc={opt.desc} default={opt.default} subfield={opt.subfield} require={opt.required} />

            });

        }

    },

    componentDidUpdate: function() {

        navigationInit.navigationInit();

    },

    render: function() {

        return (

            <div className="parent">

                <div className="container-fluid">

                    <h3 className="no-padding"> &nbsp; <i className="ion-gear-a"></i> &nbsp; Advanced Configuration Options</h3>

                <hr />

                <div className="col-xs-10">

                    <span className="navable label label-selected" data-function="selectBox">FCEUMM</span>
                        &nbsp; &nbsp;
                    <span className="navable label label-unselected" data-function="selectBox">FCE-Ultra</span>

                </div>

                <div className="col-xs-1">
                    <span className="navable label label-selected" data-function="selectBox">Achievements</span>
                </div>

                <div className="clearfix"></div>

                <hr />

                </div>

                <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>


                    <div className={navable}>

                        { optionNodes }

                    </div>

                    <div className="clearfix"></div>

                    <hr />

                    <button className="pull-left btn btn-alt btn-alt-size navable" data-function="closeDialog"><i className='ion-close'></i> &nbsp; Cancel</button>
                    <button className="pull-right btn btn-alt btn-alt-size navable" data-function='submitForm' data-parameters={this.props.form}><i className='ion-checkmark'></i> &nbsp; Save Changes</button>

                    <input type="hidden" name="server" value={this.props.server} />
                    <input type="hidden" name="filename" value="test2.json" />
                    <input type="hidden" name="ensureExists" value={this.props.ensureExists} />

                </form>

            </div>

        );
    }
});
