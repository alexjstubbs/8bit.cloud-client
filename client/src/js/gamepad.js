/**
 * Copyright 2012 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mwichary@google.com (Marcin Wichary)
 */

 /*
  * Software/File has been modified by alex@alexstubbs.com.
  * Modifications include event specifics for use for the ignition Software.
  * Original unmodified source can be found at: http://www.html5rocks.com/en/tutorials/doodles/gamepad/
  *
*/

var navigationKeyEvent      = require("./navigation.keyEvent.js"),
    sounds                  = require("./system.sounds.js"),
    mousetrap               = require("./mousetrap.min.js"),
    eventDispatcher     	= require('./events'),
    api                     = require('socket.io-client')('/api'),
    systemSettings          = require('./system.settings').settings,
    _                       = require("lodash"),
    buttonTimestamp         = {},
    _doubleTap;


// Re-poll gamepads on script haulting errors;
window.onerror = function() {
    gamepadSupport.ticking = false;
    gamepadSupport.startPolling();
};

var gamepadSupport = {

        STATE_CHANGE: 0,

        // A number of typical buttons recognized by Gamepad API and mapped to
        // standard controls. Any extraneous buttons will have larger indexes.
        TYPICAL_BUTTON_COUNT: 16,


        // A number of typical axes recognized by Gamepad API and mapped to
        // standard controls. Any extraneous buttons will have larger indexes.
        TYPICAL_AXIS_COUNT: 4,

        // Whether we’re requestAnimationFrameing like it’s 1999.
        ticking: false,

        // The canonical list of attached gamepads, without “holes” (always
        // starting at [0]) and unified between Firefox and Chrome.
        gamepads: [],

        // Remembers the connected gamepads at the last check; used in Chrome
        // to figure out when gamepads get connected or disconnected, since no
        // events are fired.
        prevRawGamepadTypes: [],

        // Previous timestamps for gamepad state; used in Chrome to not bother with
        // analyzing the polled data if nothing changed (timestamp is the same
        // as last time).
        prevTimestamps: [],

        /**
         * Initialize support for Gamepad API.
         */
        init: function() {


            if (typeof systemSettings.get.gamepad === "undefined") {
                _doubleTap = false;
            }

            else {
                _doubleTap = systemSettings.get.gamepad.doubleTap;
            }

            // As of writing, it seems impossible to detect Gamepad API support
            // in Firefox, hence we need to hardcode it in the third clause.
            // (The preceding two clauses are for Chrome.)
            var gamepadSupportAvailable = !! navigator.webkitGetGamepads || !! navigator.webkitGamepads ||
                (navigator.userAgent.indexOf('Firefox/') != -1);

            if (!gamepadSupportAvailable) {
                // It doesn’t seem Gamepad API is available – show a message telling
                // the visitor about it.
                // tester.showNotSupported();
            } else {
                // Firefox supports the connect/disconnect event, so we attach event
                // handlers to those.
                window.addEventListener('MozGamepadConnected',
                    gamepadSupport.onGamepadConnect, false);
                window.addEventListener('MozGamepadDisconnected',
                    gamepadSupport.onGamepadDisconnect, false);

                // Since Chrome only supports polling, we initiate polling loop straight
                // away. For Firefox, we will only do it if we get a connect event.
                if ( !! navigator.webkitGamepads || !! navigator.webkitGetGamepads) {

                    gamepadSupport.startPolling();
                }
            }
        },

        /**
         * React to the gamepad being connected. Today, this will only be executed
         * on Firefox.
         */
        onGamepadConnect: function(event) {

            // Add the new gamepad on the list of gamepads to look after.
            gamepadSupport.gamepads.push(event.gamepad);

            // Ask the tester to update the screen to show more gamepads.
            // tester.updateGamepads(gamepadSupport.gamepads);

            // Start the polling loop to monitor button changes.
            gamepadSupport.startPolling();
        },

        // This will only be executed on Firefox.
        onGamepadDisconnect: function(event) {
            // Remove the gamepad from the list of gamepads to monitor.
            for (var i in gamepadSupport.gamepads) {
                if (gamepadSupport.gamepads[i].index == event.gamepad.index) {
                    gamepadSupport.gamepads.splice(i, 1);
                    break;
                }
            }

            // If no gamepads are left, stop the polling loop.
            if (gamepadSupport.gamepads.length == 0) {
                gamepadSupport.stopPolling();

            }

            // Ask the tester to update the screen to remove the gamepad.
            // tester.updateGamepads(gamepadSupport.gamepads);
        },

        /**
         * Starts a polling loop to check for gamepad state.
         */
        startPolling: function() {


            // Don’t accidentally start a second loop, man.
            if (!gamepadSupport.ticking) {
                gamepadSupport.ticking = true;
                gamepadSupport.tick();
            }
        },

        /**
         * Stops a polling loop by setting a flag which will prevent the next
         * requestAnimationFrame() from being scheduled.
         */
        stopPolling: function() {
            gamepadSupport.ticking = false;

        },

        /**
         * A function called with each requestAnimationFrame(). Polls the gamepad
         * status and schedules another poll.
         */
        tick: function() {

            gamepadSupport.pollStatus();
            gamepadSupport.scheduleNextTick();
        },

        scheduleNextTick: function() {

            // Only schedule the next frame if we haven’t decided to stop via
            // stopPolling() before.
            if (gamepadSupport.ticking) {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(gamepadSupport.tick);
                } else if (window.mozRequestAnimationFrame) {
                    window.mozRequestAnimationFrame(gamepadSupport.tick);
                } else if (window.webkitRequestAnimationFrame) {
                    window.webkitRequestAnimationFrame(gamepadSupport.tick);
                }
                // Note lack of setTimeout since all the browsers that support
                // Gamepad API are already supporting requestAnimationFrame().
            }
        },

        /**
         * Checks for the gamepad status. Monitors the necessary data and notices
         * the differences from previous state (buttons for Chrome/Firefox,
         * new connects/disconnects for Chrome). If differences are noticed, asks
         * to update the display accordingly. Should run as close to 60 frames per
         * second as possible.
         */
        pollStatus: function() {


            // Poll to see if gamepads are connected or disconnected. Necessary
            // only on Chrome.
            gamepadSupport.pollGamepads();

            for (var i in gamepadSupport.gamepads) {
                var gamepad = gamepadSupport.gamepads[i];

                // Don’t do anything if the current timestamp is the same as previous
                // one, which means that the state of the gamepad hasn’t changed.
                // This is only supported by Chrome right now, so the first check
                // makes sure we’re not doing anything if the timestamps are empty
                // or undefined.
                if (gamepad.timestamp &&
                    (gamepad.timestamp == gamepadSupport.prevTimestamps[i])) {
                    continue;
                }
                gamepadSupport.prevTimestamps[i] = gamepad.timestamp;

                gamepadSupport.buttonPressed(gamepad.buttons);
                gamepadSupport.axesPressed(gamepad.axes);

            }
        },

        doubleTap: function(button, callback) {

            // Double Tap check
            if (_.uniq(button).length == 2) {

                var button_a = button.toString();

                if (buttonTimestamp.button) {
                    var button_b = buttonTimestamp.button.toString();
                }

                if (button_a == button_b) {

                    if (buttonTimestamp.timestamp) {

                        var now = Math.round(+new Date()/100);
                        var diff = now - buttonTimestamp.timestamp;

                        // TODO: Make this number adjustable in settings

                        if (diff < 2.2) {
                            callback(true);
                        }

                        else {
                            callback(false);
                        }
                    }
                }

                else {
                    callback(false);
                }

                buttonTimestamp = {
                    timestamp: Math.round(+new Date()/100),
                    button: button
                };

            }

        },

        buttonPressed: function(button) {

                var index = _.indexOf(button, 1);

                eventDispatcher.gamepadEvent({
                    type: "button",
                    index: index
                });

                // eventDispatcher.bindKeyMapping(_.indexOf(button, 1));

                var buttonAction = function(dt) {

                if (!dt) {

                    // Mappings

                    if (button[5]) {
                        navigationKeyEvent(221);
                        // Mousetrap.trigger(']', null);

                    }

                    if (button[4]) {
                        navigationKeyEvent(219);
                        // Mousetrap.trigger('[', null);
                    }

                    if (button[8] || button[1] || button [3]) {
                        Mousetrap.trigger('shift');
                    }

                    if (button[0] || button[2] || button[9]) {
                        Mousetrap.trigger('enter');
                    }
                }


            };

            if (_doubleTap) {

                gamepadSupport.doubleTap(button, function(dt) {
                    buttonAction(dt);
                });

            }

            else {
                buttonAction(false);
            }



        },

        axesPressed: function(axes) {

            var axesAction = function(dt) {

                if (!dt) {

                    if (axes[1] == 1) {
                        // console.log("down");
                        navigationKeyEvent(40);
                        // Mousetrap.trigger('down');

                    }

                    if (axes[1] == -1) {
                        // console.log("up");
                        navigationKeyEvent(38);
                        // Mousetrap.trigger('up');

                    }

                    if (axes[0] == 1) {
                        // console.log("right");
                        navigationKeyEvent(39);
                        // Mousetrap.trigger('right');


                    }
                    if (axes[0] == -1) {
                        // console.log("left");
                        navigationKeyEvent(37);
                        // Mousetrap.trigger('left');
                    }
                }

                else {

                    if (axes[0] == 1) {
                        navigationKeyEvent(221);
                    }

                    if (axes[0] == -1) {
                        navigationKeyEvent(219);
                    }
                }
            };


            if (_doubleTap) {

                gamepadSupport.doubleTap(axes, function(dt) {
                    axesAction(dt);
                });

            }

            else {
                axesAction(false);
            }

        },

        // This function is called only on Chrome, which does not yet support
        // connection/disconnection events, but requires you to monitor
        // an array for changes.
        pollGamepads: function() {


            // Get the array of gamepads – the first method (function call)
            // is the most modern one, the second is there for compatibility with
            // slightly older versions of Chrome, but it shouldn’t be necessary
            // for long.
            var rawGamepads =
                (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
                navigator.webkitGamepads;

            if (rawGamepads) {

                // We don’t want to use rawGamepads coming straight from the browser,
                // since it can have “holes” (e.g. if you plug two gamepads, and then
                // unplug the first one, the remaining one will be at index [1]).
                gamepadSupport.gamepads = [];

                // We only refresh the display when we detect some gamepads are new
                // or removed; we do it by comparing raw gamepad table entries to
                // “undefined.”
                var gamepadsChanged = false;

                for (var i = 0; i < rawGamepads.length; i++) {

                    if (typeof rawGamepads[i] != gamepadSupport.prevRawGamepadTypes[i]) {
                        gamepadsChanged = true;
                        gamepadSupport.prevRawGamepadTypes[i] = typeof rawGamepads[i];

                    }

                    if (rawGamepads[i]) {
                        gamepadSupport.gamepads.push(rawGamepads[i]);

                    }
                }

                // Ask the tester to refresh the visual representations of gamepads
                // on the screen.
                if (gamepadsChanged) {

                    console.log("changed", rawGamepads[0]);

                    // Event Change (ignition):
                    if (rawGamepads[0]) {

                        console.log("[gamepad]: Gamepad Connected!");

                        eventDispatcher.gamepadConnected(rawGamepads[0]);

                        gamepadSupport.STATE_CHANGE = 1;

                    } else {

                        console.log("[gamepad]: No Gamepad Detected!");

                        if (gamepadSupport.STATE_CHANGE == 1) {

                            console.log("[gamepad]: Gamepad Disconnected!");

                            eventDispatcher.gamepadConnected(rawGamepads[0]);
                            gamepadSupport.STATE_CHANGE = 0;

                        }


                        // if (once == 1) {
                        //  notify.log("<i class='icon ion-game-controller-a'></i> No Gamepad Detected");
                        //  // once = 0;
                        // }

                    }
                    // tester.updateGamepads(gamepadSupport.gamepads);
                }
            }
        },

        // Call the tester with new state and ask it to update the visual
        // representation of a given gamepad.
        updateDisplay: function(gamepadId) {

            var gamepad = gamepadSupport.gamepads[gamepadId];

            // Update all the buttons (and their corresponding labels) on screen.
            // tester.updateButton(gamepad.buttons[0], gamepadId, 'button-1');
            // tester.updateButton(gamepad.buttons[1], gamepadId, 'button-2');
            // tester.updateButton(gamepad.buttons[2], gamepadId, 'button-3');
            // tester.updateButton(gamepad.buttons[3], gamepadId, 'button-4');

            // tester.updateButton(gamepad.buttons[4], gamepadId,
            //     'button-left-shoulder-top');
            // tester.updateButton(gamepad.buttons[6], gamepadId,
            //     'button-left-shoulder-bottom');
            // tester.updateButton(gamepad.buttons[5], gamepadId,
            //     'button-right-shoulder-top');
            // tester.updateButton(gamepad.buttons[7], gamepadId,
            //     'button-right-shoulder-bottom');

            // tester.updateButton(gamepad.buttons[8], gamepadId, 'button-select');
            // tester.updateButton(gamepad.buttons[9], gamepadId, 'button-start');

            // tester.updateButton(gamepad.buttons[10], gamepadId, 'stick-1');
            // tester.updateButton(gamepad.buttons[11], gamepadId, 'stick-2');

            // tester.updateButton(gamepad.buttons[12], gamepadId, 'button-dpad-top');
            // tester.updateButton(gamepad.buttons[13], gamepadId, 'button-dpad-bottom');
            // tester.updateButton(gamepad.buttons[14], gamepadId, 'button-dpad-left');
            // tester.updateButton(gamepad.buttons[15], gamepadId, 'button-dpad-right');

            // // Update all the analogue sticks.
            // tester.updateAxis(gamepad.axes[0], gamepadId,
            //     'stick-1-axis-x', 'stick-1', true);
            // tester.updateAxis(gamepad.axes[1], gamepadId,
            //     'stick-1-axis-y', 'stick-1', false);
            // tester.updateAxis(gamepad.axes[2], gamepadId,
            //     'stick-2-axis-x', 'stick-2', true);
            // tester.updateAxis(gamepad.axes[3], gamepadId,
            //     'stick-2-axis-y', 'stick-2', false);

            // Update extraneous buttons.
            // var extraButtonId = gamepadSupport.TYPICAL_BUTTON_COUNT;
            // while (typeof gamepad.buttons[extraButtonId] != 'undefined') {
            //     tester.updateButton(gamepad.buttons[extraButtonId], gamepadId,
            //         'extra-button-' + extraButtonId);
            //
            //     extraButtonId++;
            // }
            //
            // // Update extraneous axes.
            // var extraAxisId = gamepadSupport.TYPICAL_AXIS_COUNT;
            // while (typeof gamepad.axes[extraAxisId] != 'undefined') {
            //     tester.updateAxis(gamepad.axes[extraAxisId], gamepadId,
            //         'extra-axis-' + extraAxisId);
            //
            //     extraAxisId++;
            // }
        }
};

exports.gamepadSupport = gamepadSupport;
