/**
* @jsx React.DOM
*/

'use strict';

var React           = require('react/addons'),
    ActionButtons   = require('../ActionButtons.jsx'),
    navigationInit  = require('../../js/navigation.init'),
    RadioSelect     = require('./RadioSelect.jsx'),
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

                     <h3 className="no-padding no-margin">

                         <span className="col-xs-4">
                             <i className="ion-ios-game-controller-a-outline"></i> &nbsp; Gamepad Connected: <span id="controller-id"></span>
                         </span>

                         <div className="well-small no-margin col-xs-8 text-right">{gamepad}</div>

                     </h3>

                     <div className="clearfix"></div>
                     <hr className="hr-thin" />


                        <div className="form-group col-xs-12">

                            <div id="gamepad-input-up" data-function="gamepadMap" className="navable-row input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong><i className="ion-arrow-up-c"></i></strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_up} />
                            </div>

                            <div  id="gamepad-input-right" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong><i className="ion-arrow-right-c"></i></strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_right}  />
                            </div>

                            <div  id="gamepad-input-down" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong><i className="ion-arrow-down-c"></i></strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_down}  />
                            </div>

                            <div id="gamepad-input-left" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong><i className="ion-arrow-left-c"></i></strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_left}  />
                            </div>

                        </div>

                        <div className="form-group col-xs-12">

                            <div id="gamepad-input-a" className="navable-row input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>A</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_a} />
                            </div>

                            <div id="gamepad-input-b" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>B</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_b}  />
                            </div>

                            <div id="gamepad-input-x" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>X</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_x}  />
                            </div>

                            <div id="gamepad-input-y" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>Y</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_y}  />
                            </div>

                        </div>



                        <div className="form-group col-xs-12">

                            <div id="gamepad-input-l1" className="navable-row input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>L1</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_l1} />
                            </div>

                            <div id="gamepad-input-l2" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>L2</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_l2}  />
                            </div>

                            <div id="gamepad-input-r1" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>R1</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_l3}  />
                            </div>

                            <div id="gamepad-input-r2" className="input-group navable col-xs-2 pull-left">
                                  <div className="input-group-addon"><strong>R2</strong></div>
                                  <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_l4}  />
                            </div>

                        </div>



                    <div className="form-group col-xs-12">

                        <div id="gamepad-input-select" className="navable-row input-group navable col-xs-2 pull-left">
                              <div className="input-group-addon"><strong>SELECT</strong></div>
                              <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_select} />
                        </div>

                        <div id="gamepad-input-start" className="input-group navable col-xs-2 pull-left">
                              <div className="input-group-addon"><strong>START</strong></div>
                              <input type="text" className="no-margin input-lg form-control" value={this.props.settings.gamepad.default.mappings.btn_start}  />
                        </div>

                    </div>

                    <div className="clearfix"></div>
                    <hr className="hr-thin" />


                    <h3 className="col-xs-7 no-padding"><i className="ion-ios-arrow-right"></i><i className="ion-ios-arrow-right"></i> &nbsp; Double Tap: <span className="sub-text">Switch interface screens by quickly double tapping left/right</span></h3>

                        <h3 className="col-xs-5">

                            <ul id="radio-doubleTap" className="radio-wrapper text-right">
                                <li className="col-xs-12"><RadioSelect group="doubleTap" id="doubleTap-enable" label='Enabled' name="double_tap" selected={this.props.settings.gamepad.doubleTap == true ? "true" : "false" } /></li>
                            </ul>

                    </h3>

                </fieldset>


            </form>

            <ActionButtons form="Gamepad" />

            </div>
        );
    }
});
