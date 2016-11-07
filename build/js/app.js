(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
}

Machine.prototype.toggleLoop = function() {
  var loop;
  if (!this.playing) {
    loop = setInterval(this.integerPrint, 125);
    this.playing = true;
  } else {
    clearInterval(loop);
    this.playing = false;
  }
};

Machine.prototype.integerPrint = function() {
  console.log("Steps" + this.steps);
  console.log("i" + this.i);
  if( this.i < this.steps) {
    this.i++;
    console.log("IF" + this.i);
  } else {
    this.i = 0;
    this.i++;
    console.log("Else" + this.i);
  }
};

exports.MachineModule = Machine;

},{}],2:[function(require,module,exports){
var Machine = require('./../js/machine.js').MachineModule;

$(function() {
  $("#toggle").click(function() {
    var machine = new Machine();
    machine.toggleLoop();
  });
});

},{"./../js/machine.js":1}]},{},[2]);
