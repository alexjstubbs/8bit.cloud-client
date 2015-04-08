/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons'),
    ActionButtons   = require('../ActionButtons.jsx'),
    navigationInit  = require('../../js/navigation.init'),
    RadioSelect     = require('./RadioSelect.jsx'),
    systemEvents    = require('../../js/system.events'),
    _               = require('lodash'),
    gamepad;

module.exports = React.createClass({

    getInitialState: function() {
            return {
                gamepad: {
                    id: "Not connected"
                }
            };
    },

    componentDidMount: function() {

        var component = this;

        window.addEventListener("gamepadConnected", function(e) {
              component.setState({gamepad: e.detail.gamepad});
        });

        window.addEventListener("bindKeyMapping", function(e) {

            var index = e.detail.event.detail.index;
            var selected = document.querySelectorAll(".selectedNav")[0];
            var selectedPre = document.querySelectorAll("#" + selected.getAttribute("id") + " .input-group-addon")[0];

            if (index != '-1') {

                if (selected) {
                    var input = document.querySelectorAll("#" + selected.getAttribute("id") + " input")[0];
                    input.value = index;
                    selectedPre.classList.add("selected");
                }
            }

            else {


                if (selectedPre.classList.contains("selected")) {

                    selectedPre.classList.remove("selected");
                    systemEvents.events.gamepadMap(true);
                }
            }

        });

    },

    render: function() {

        if (typeof this.state.gamepad === "undefined") {
            gamepad = "Not Connected";
        }

        else {
            gamepad = this.state.gamepad.id;
        }

        return (
            <div className="_parent">
                <form accept-charset="UTF-8" role="form" name="Gamepad" id="Gamepad">


                 <fieldset>

                     <h3>Gamepad Button Bindings</h3>
                     <h3 className="no-padding no-margin hidden">

                         <span className="col-xs-4">
                             <i className="ion-ios-game-controller-b"></i> &nbsp; Gamepad Connected: <span id="controller-id"></span>
                         </span>

                         <div className="well-small no-margin col-xs-8 text-right">{gamepad}</div>

                     </h3>

                     <div className="clearfix"></div>
                     <hr className="hr-thin" />


                        <div className="form-group col-xs-12">

                            <div id="gamepad-input-up" data-function="gamepadMap" className="navable-row input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong><i className="ion-arrow-up-c"></i></strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_up} name="input_player1_up_btn"/>
                            </div>

                            <div  id="gamepad-input-right" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong><i className="ion-arrow-right-c"></i></strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_right} name="input_player1_right_btn" />
                            </div>

                            <div  id="gamepad-input-down" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong><i className="ion-arrow-down-c"></i></strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_down}  name="input_player1_down_btn" />
                            </div>

                            <div id="gamepad-input-left" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong><i className="ion-arrow-left-c"></i></strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_left}  name="input_player1_left_btn" />
                            </div>

                        </div>

                        <div className="form-group col-xs-12">

                            <div id="gamepad-input-a" data-function="gamepadMap" className="navable-row input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>A</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_a} name="input_player1_a_btn" />
                            </div>

                            <div id="gamepad-input-b" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>B</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_b} name="input_player1_b_btn" />
                            </div>

                            <div id="gamepad-input-x" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>X</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_x} name="input_player1_x_btn" />
                            </div>

                            <div id="gamepad-input-y" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>Y</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_y} name="input_player1_y_btn" />
                            </div>

                        </div>



                        <div className="form-group col-xs-12">

                            <div id="gamepad-input-l1" data-function="gamepadMap" className="navable-row input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>L1</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_l1} name="input_player1_l1_btn" />
                            </div>

                            <div id="gamepad-input-l2" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>L2</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_l2} name="input_player1_l2_btn" />
                            </div>

                            <div id="gamepad-input-r1" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>R1</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_r1} name="input_player1_r1_btn" />
                            </div>

                            <div id="gamepad-input-r2" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>R2</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_r2} name="input_player1_r2_btn" />
                            </div>

                        </div>



                    <div className="form-group col-xs-12">

                        <div id="gamepad-input-select" data-function="gamepadMap" className="navable-row input-group navable col-xs-2 pull-left">
                              <div className="input-group-addon"><strong>SELECT</strong></div>
                              <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_select} name="input_player1_select_btn" />
                        </div>

                        <div id="gamepad-input-start" data-function="gamepadMap" className="input-group navable col-xs-2 pull-left">
                              <div className="input-group-addon"><strong>START</strong></div>
                              <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.btn_start} name="input_player1_start_btn" />
                        </div>

                    </div>

                    <div className="clearfix"></div>
                    <hr className="hr-thin" />


                    <h3 className="col-xs-7 no-padding"><i className="ion-ios-arrow-right"></i><i className="ion-ios-arrow-right"></i> &nbsp; Double Tap: <span className="sub-text">Switch interface screens by quickly double tapping left/right</span></h3>

                        <h3 className="col-xs-5">

                            <ul id="radio-doubleTap" className="radio-wrapper text-right">
                                <li className="col-xs-12"><RadioSelect group="doubleTap" id="doubleTap-enable" label='Enabled' name="true" selected={this.props.settings.gamepad.doubleTap == "true" ? "true" : "false" } /></li>
                            </ul>

                    </h3>

                </fieldset>

                <input type="hidden" id="input-doubleTap" name="doubleTap" value="false" />

            </form>

            <ActionButtons form="Gamepad" />

            </div>
        );
    }
});
