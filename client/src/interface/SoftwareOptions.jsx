/**
* @jsx React.DOM
*/

var React           = require('react/addons')
,   _               = require('lodash')
,   navigationInit  = require('../js/navigation.init')
,   OptionNode      = require('./OptionNode.jsx');

module.exports = React.createClass({

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
                            "required": false
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
                        },

                        "-B/--bsxslot": {
                            "arg": "-B",
                            "desc": "Path to BSX slotted rom. Load BSX BIOS as the regular rom.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "--sufamiA": {
                            "arg": "--sufamiA",
                            "desc": "Path to A slot of Sufami Turbo. Load Sufami base cart as regular rom.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "--sufamiB": {
                            "arg": "--sufamiB",
                            "desc": "Path to B slot of Sufami Turbo.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-N/--nodevice": {
                            "arg": "-N",
                            "desc": "Disconnects controller device connected to port (1 to 8).",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-A/--dualanalog": {
                            "arg": "-A",
                            "desc": "Connect a DualAnalog controller to port (1 to 8)",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-m/--mouse": {
                            "arg": "-m",
                            "desc": "Connect a mouse into port of the device (1 to 8).",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-p/--scope": {
                            "arg": "-p",
                            "desc": "Connect a virtual SuperScope into port 2. (SNES specific).",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "j/--justifier": {
                            "arg": "-j",
                            "desc": "Connect a virtual Konami Justifier into port 2. (SNES specific).",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "j/--justifier": {
                            "arg": "-j",
                            "desc": "Connect a virtual Konami Justifier into port 2. (SNES specific).",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "-J/--justifiers": {
                            "arg": "-J",
                            "desc": "Daisy chain two virtual Konami Justifiers into port 2. (SNES specific).",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "-4/--multitap": {
                            "arg": "-4",
                            "desc": "Connect a SNES multitap to port 2. (SNES specific).",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "-P/--bsvplay": {
                            "arg": "-P",
                            "desc": "Playback a BSV movie file.",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "-R/--bsvrecord": {
                            "arg": "-R",
                            "desc": "Start recording a BSV movie file from the beginning.",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "-M/--sram-mode": {
                            "arg": "-M",
                            "desc": "Takes an argument telling how SRAM should be handled in the session. {no,}load-{no,}: save describes if SRAM should be loaded, and if SRAM should be saved. Do note that noload-save implies that save files will be deleted and overwritten.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-H/--host": {
                            "arg": "-H",
                            "desc": "Host netplay as player 1.",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "-C/--connect": {
                            "arg": "-C",
                            "desc": "Connect to netplay as player 2.",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "--port": {
                            "arg": "--port",
                            "desc": "Port used to netplay. Default is 55435",
                            "default": "55435",
                            "subfield": false,
                            "required": false
                        },

                        "-F/--frames": {
                            "arg": "-F",
                            "desc": "Sync frames when using netplay.",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "--spectate": {
                            "arg": "--spectate",
                            "desc": "Netplay will become spectating mode. Host can live stream the game content to players that connect. However, the client will not be able to play. Multiple clients can connect to the host.",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "--nick": {
                            "arg": "--nick",
                            "desc": "picks a nickname for use with netplay. Not mandatory.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "--command": {
                            "arg": "--command",
                            "desc": "Sends a command over UDP to an already running RetroArch process. Available commands are listed if command is invalid.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "r/--record": {
                            "arg": "-r",
                            "desc": "Path to record video file. Using .mkv extension is recommended.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "--recordconfig": {
                            "arg": "--recordconfig",
                            "desc": "Path to settings used during recording.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "--size": {
                            "arg": "--recordconfig",
                            "desc": "Overrides output video size when recording with FFmpeg (format: WIDTHxHEIGHT).",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-v/--verbose": {
                            "arg": "-v",
                            "desc": "Verbose logging.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-U/--ups": {
                            "arg": "-U",
                            "desc": "Specifies path for UPS patch that will be applied to ROM.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "--bps": {
                            "arg": "--bps",
                            "desc": "Specifies path for BPS patch that will be applied to ROM.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "--ips": {
                            "arg": "--bps",
                            "desc": "Specifies path for IPS patch that will be applied to ROM.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "--no-patch": {
                            "arg": "--no-patch",
                            "desc": "Disables all forms of rom patching.",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },

                        "-X/--xml": {
                            "arg": "-X",
                            "desc": "Specifies path to XML memory map.",
                            "default": null,
                            "subfield": true,
                            "required": false
                        },

                        "-D/--detach": {
                            "arg": "-D",
                            "desc": "Detach RetroArch from the running console. Not relevant for all platforms.",
                            "default": null,
                            "subfield": false,
                            "required": false
                        },



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

        if (Object.keys(this.state[this.props.software].arguements).length >= 6) {
            navable = "messages-list";
        };

        var idPre = this.props.software;

        var optionNodes = _.map(this.state[this.props.software].arguements, function(opt, i) {

            return <OptionNode id={idPre+i} arg={opt.arg} desc={opt.desc} default={opt.default} subfield={opt.subfield} require={opt.required} />

        });

        return (

            <div className="parent">

                <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>


                    <div className={navable}>

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