(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
}

Machine.prototype.toggleLoop = function() {
  // console.log(this.playing);
  var _this = this;
  function integerPrint() {
    if( _this.i < _this.steps) {
      _this.i++;
      console.log("IF " + _this.i);
    } else {
      _this.i = 0;
      _this.i++;
      console.log("Else " + _this.i);
    }
  }
  console.log("Toggle Loop Playing: " + this.playing);
  this.playing = true;
  console.log("Toggle Loop Playing: " + this.playing);
  this.loop = setInterval(integerPrint, 125);
};

Machine.prototype.stopLoop = function() {
  console.log("Stop Loop Playing: " + this.playing);
  this.playing = false;
  console.log("Stop Loop Playing: " + this.playing);
  console.log(this.loop);
  clearInterval(this.loop);
};

exports.MachineModule = Machine;

},{}],2:[function(require,module,exports){
var Machine = require('./../js/machine.js').MachineModule;
var machine = new Machine();

$(function() {
  $("#toggle").click(function() {
    if (machine.playing) {
      machine.stopLoop();
    } else {
      machine.toggleLoop();
    }
  });
});

},{"./../js/machine.js":1}]},{},[2]);
