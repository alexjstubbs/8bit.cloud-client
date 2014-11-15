/* OnScreen Keyboard
-------------------------------------------------- */
var navigationInit  = require('./navigation.init.js')

/* Mini Keyboard
-------------------------------------------------- */
var miniKeyboard = function(elem) {
  
    console.log("WED");

    this.elem = elem;
    this.elem.className = "keyboard";

    miniKeyboard.rows.map(function(row, i) {
      
      this.elem.appendChild(this.createRow(row, i));

    }.bind(this));
};

/* Modal Keyboard
-------------------------------------------------- */
var Keyboard = function(elem) {

    this.elem = elem;
    this.elem.className = "keyboard";

    Keyboard.rows.map(function(row, i) {
      
      this.elem.appendChild(this.createRow(row, i));

    }.bind(this));
};

Keyboard.rows = [
  [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  [ "q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  [ "a", "s", "d", "f", "g", "h", "j", "k", "l", "z"],
  [ "<i class='ion-ios7-arrow-thin-up'></i>", "<i class='ion-arrow-up-a'></i>", "x", "c", "v", "b", "n", "m", "'", "?"],
  [ ".", ",", "<i class='ion-at'></i>", "&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; SPACE &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; ", "<i class='ion-arrow-left-b opacity-20'></i>", "<i class='ion-arrow-right-b opacity-20'></i>", "<i class='ion-arrow-left-a'></i>", "<i class='ion-checkmark'></i>" ],
];

miniKeyboard.rows = [
  [ "q", "w", "e", "r", "t", "y", "u", "i"],
  [ "o", "p", "a", "s", "d", "f", "g", "h"],
  [ "j", "k", "l", "z"],
  [ "<i class='ion-ios7-arrow-thin-up'></i>", "<i class='ion-arrow-up-a'></i>", "x", "c", "v", "b", "n", "m", "'", "?"],
  [ ".", ",", "<i class='ion-at'></i>", "&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; SPACE &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; ", "<i class='ion-arrow-left-b opacity-20'></i>", "<i class='ion-arrow-right-b opacity-20'></i>", "<i class='ion-arrow-left-a'></i>", "<i class='ion-checkmark'></i>" ],
];


/* Mini Keyboard ALPHA

-------------------------------------------------- */
miniKeyboard.prototype.createRow = function(row, i) {

  var div = document.createElement("div");
      div.setAttribute("data-row", i);

  row.map(function(key) {
    div.appendChild(this.createKey(key));
  }.bind(this));

  return div;
};

miniKeyboard.prototype.createKey = function(key) {
  var button = document.createElement("div");
  button.classList.add("navable", "btn", "_key", "rowParent");
  button.setAttribute("data-function", "depressKey");
  button.setAttribute("data-parameters", key);

  if (!key.match(/^[0-9a-z]+$/)) {
      button.classList.add("key-dark");
  };

  if (key == "<i class='ion-checkmark'></i>") {
      button.classList.add("key-blue");
  }

  button.innerHTML = key;
  button.addEventListener("click", this.onKeypress.bind(this, key));
  return button;
};

miniKeyboard.prototype.onKeypress = function(key, event) {
  var keypressEvent = new Event("keypress");
  keypressEvent.key = key;
  this.elem.dispatchEvent(keypressEvent);
  event.preventDefault();
};

/* Full Keyboard
-------------------------------------------------- */

Keyboard.prototype.createRow = function(row, i) {

  var div = document.createElement("div");
      div.setAttribute("data-row", i);

  row.map(function(key) {
    div.appendChild(this.createKey(key));
  }.bind(this));

  return div;
};

Keyboard.prototype.createKey = function(key) {
  var button = document.createElement("div");
  button.classList.add("navable", "btn", "_key", "rowParent");
  button.setAttribute("data-function", "depressKey");
  button.setAttribute("data-parameters", key);

  if (!key.match(/^[0-9a-z]+$/)) {
      button.classList.add("key-dark");
  };

  if (key == "<i class='ion-checkmark'></i>") {
      button.classList.add("key-blue");
  }

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

/* Exports
-------------------------------------------------- */
exports.Keyboard      = Keyboard;
exports.miniKeyboard  = miniKeyboard;
