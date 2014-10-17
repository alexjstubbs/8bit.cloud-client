/* OnScreen Keyboard
-------------------------------------------------- */
var navigationInit  = require('./navigation.init.js')

var Keyboard = function(elem) {

    this.elem = elem;
    this.elem.className = "keyboard";

    Keyboard.rows.map(function(row) {
      this.elem.appendChild(this.createRow(row));
    }.bind(this));
  };

  Keyboard.rows = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"],
    ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "return"],
    ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift"],
  ];

  Keyboard.prototype.createRow = function(row) {
    var div = document.createElement("div");

    row.map(function(key) {
      div.appendChild(this.createKey(key));
    }.bind(this));

    return div;
  };

  Keyboard.prototype.createKey = function(key) {
    var button = document.createElement("div");
    button.classList.add("navable", "btn");
    button.setAttribute("data-function", "depressKey");
    button.setAttribute("data-parameters", key);
    button.innerHTML = key;
    button.addEventListener("click", this.onKeypress.bind(this, key));
    return button;
  };

  Keyboard.prototype.onKeypress = function(key, event) {
    var keypressEvent = new Event("keypress");
    keypressEvent.key = key;
    this.elem.dispatchEvent(keypressEvent);
    event.preventDefault();
  };

  // var div = document.getElementsByTagName("div")[0];
  // new Keyboard(div);

  // div.addEventListener("keypress", function(event) {
  //   console.log(event.key + " was pressed", event);
  // });



/* Exports
-------------------------------------------------- */
exports.Keyboard = Keyboard;
