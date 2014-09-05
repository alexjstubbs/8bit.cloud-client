'use strict';

var KEYS = {
  enter: 13,
  left: 37,
  right: 39,
  escape: 27,
  backspace: 8,
  comma: 188,
  shift: 16,
  control: 17,
  command: 91
};

var pressedKeys = {};

var onKeyDown = function(event) {
  pressedKeys[event.which] = true;
  console.log(event);
};

var onKeyUp = function(event) {
  pressedKeys[event.which] = null;
};

var KeyboardShortcutsMixin = {
  onKeyboardShortcut: function(event, shortcuts) {
    if (typeof shortcuts !== 'function') {
      shortcuts = this.getKeyboardShortcuts();
    }

    return shortcuts.reduce(function(result, handler, key) {
      var keyCode = KEYS[key] || key;

      if (keyCode === event.keyCode) {
        if (handler(event) === false) {
          result = false;
        }
      }

      return result;
    }, true);
  },

  isKeyPressed: function(key) {
    var keyCode = key in KEYS ? KEYS[key] : key;
    return pressedKeys[keyCode];
  },

  componentDidMount: function(e) {

    document.getElementById("list").addEventListener('keyup', onKeyUp);
    // document.addEventListener('keydown', onKeyDown);
    document.getElementById("list").addEventListener('down', onKeyDown);

  },

  componentWillUnmount: function() {
     document.getElementById("list").removeEventListener('keyup', onKeyUp);
     document.getElementById("list").removeEventListener('keydown', onKeyDown);
  }
};

module.exports = KeyboardShortcutsMixin;
