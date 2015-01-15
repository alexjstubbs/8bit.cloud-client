/**
* @jsx React.DOM
*/

var React           = require('react/addons')
,   _               = require('lodash')
,   navigationInit  = require('../js/navigation.init')
,   OptionNode      = require('./OptionNode.jsx');

module.exports = React.createClass({

    // "-B/--bsxslot": "Path to BSX slotted rom. Load BSX BIOS as the regular rom.",
    // "--sufamiA": "Path to A slot of Sufami Turbo. Load Sufami base cart as regular rom.",
    // "--sufamiB": "Path to B slot of Sufami Turbo.",
    // "-N/--nodevice": "Disconnects controller device connected to port (1 to 8).",
    // "-A/--dualanalog": "Connect a DualAnalog controller to port (1 to 8).",
    // "-m/--mouse": "Connect a mouse into port of the device (1 to 8).",
    // "-p/--scope": "Connect a virtual SuperScope into port 2. (SNES specific).",
    // "-j/--justifier": "Connect a virtual Konami Justifier into port 2. (SNES specific).",
    // "-J/--justifiers": "Daisy chain two virtual Konami Justifiers into port 2. (SNES specific).",
    // "-4/--multitap": "Connect a SNES multitap to port 2. (SNES specific).",
    // "-P/--bsvplay": "Playback a BSV movie file.",
    // "-R/--bsvrecord": "Start recording a BSV movie file from the beginning.",
    // "-M/--sram-mode": "Takes an argument telling how SRAM should be handled in the session. {no,}load-{no,}: save describes if SRAM should be loaded, and if SRAM should be saved. Do note that noload-save implies that save files will be deleted and overwritten.",
    // "-H/--host": "Host netplay as player 1.",
    // "-C/--connect": "Connect to netplay as player 2.",
    // "--port": "Port used to netplay. Default is 55435.",
    // "-F/--frames": "Sync frames when using netplay.",
    // "--spectate": "Netplay will become spectating mode. Host can live stream the game content to players that connect. However, the client will not be able to play. Multiple clients can connect to the host.",
    // "--nick": "picks a nickname for use with netplay. Not mandatory.",
    // "--command": "Sends a command over UDP to an already running RetroArch process. Available commands are listed if command is invalid.",
    // "-r/--record": "Path to record video file. Using .mkv extension is recommended.",
    // "--recordconfig": "Path to settings used during recording.",
    // "--size": "Overrides output video size when recording with FFmpeg (format: WIDTHxHEIGHT).",
    // "-v/--verbose": "Verbose logging.",
    // "-U/--ups": "Specifies path for UPS patch that will be applied to ROM.",
    // "--bps": "Specifies path for BPS patch that will be applied to ROM.",
    // "--ips": "Specifies path for IPS patch that will be applied to ROM.",
    // "--no-patch": "Disables all forms of rom patching.",
    // "-X/--xml": "Specifies path to XML memory map.",
    // "-D/--detach": "Detach RetroArch from the running console. Not relevant for all platforms."

    getInitialState: function() {
            return {
                "retroarch": {
                    "package": "retroarch",
                    "option_index": 1,
                    "suppliment":  {
                        index: 0,
                        required: true,
                        value: null
                    },
                    "arguements": {

                        "-c/--config": {
                            "arg": "-c",
                            "desc": "Path for config file. By default looks for config in $XDG_CONFIG_HOME/retroarch/retroarch.cfg, $HOME/.config/retroarch/retroarch.cfg, and $HOME/.retroarch.cfg.",
                            "default": "/opt/configs/ignition/retroarch.conf",
                            "subfield": true,
                            "required": false
                        },

                        "--appendconfig": {
                            "arg": "--appendconfig",
                            "desc": "Extra config files are loaded in, and take priority over config selected in -c (or default). Multiple configs are delimited by ','.",
                            "default": null,
                            "subfield": true,
                            "required": true
                        },

                        "-L/--libretro": {
                            "arg": "-L",
                            "desc": "Path to libretro implementation. Overrides any config setting.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-g/--gameboy": {
                            "arg": "-g",
                            "desc": "Path to Gameboy ROM. Load SuperGameBoy as the regular rom.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-b/--bsx": {
                            "arg": "-b",
                            "desc": "Path to BSX rom. Load BSX BIOS as the regular rom.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        }

                    }


                }
            }
    },

    getDefaultProps: function() {

        return {
            software: "retroarch",
            form: "softwareOptions",
            backdrop: true,
            server: "false",
            classList: 'col-xs-12'
        }
    },

    componentDidMount: function() {

        navigationInit.navigationInit();

    },

    render: function() {

        var navable;

        var idPre = this.props.software;

        var optionNodes = _.map(this.state[this.props.software].arguements, function(opt, i) {

            return <OptionNode id={idPre+i} arg={opt.arg} desc={opt.desc} default={opt.default} subfield={opt.subfield} require={opt.required} />

        });

        return (

            <div className="parent">

                <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

                    <div className={navable + " scrollable-view">

                        {optionNodes}

                    </div>

                    <div className="clearfix"></div>

                    <hr />

                    <button className="pull-left btn btn-alt btn-alt-size navable" data-function="closeDialog"><i className='ion-close'></i> &nbsp; Cancel</button>
                    <button className="pull-right btn btn-alt btn-alt-size navable" data-function="closeDialog"><i className='ion-checkmark'></i> &nbsp; Save Changes</button>


                </form>

            </div>

        );
    }
});
