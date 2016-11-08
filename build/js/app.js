(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.boolArray = [false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false];
  this.allSounds = [];
}

Machine.prototype.createSounds = function(_sound){
  var soundArray = [];
  for (var i = 0; i < 16; i++) {
    $("#sounds").append("<audio src='public/sounds/" + _sound + ".WAV' id='" + _sound + i + "' controls></audio>");
    var sound = document.getElementById(_sound + i);
    soundArray.push(sound);
  }
  this.allSounds.push(soundArray);
};

Machine.prototype.toggleLoop = function() {
  var _this = this;
  function metronome() {
    if( _this.i === _this.steps) {
      _this.i = 0;
    }
    for (var i = 0; i < _this.allSounds.length; i++) {
      if (_this.boolArray[_this.i]) {
        _this.allSounds[i][_this.i].play();
      }
    }
    _this.i++;
  }
  this.playing = true;
  this.loop = setInterval(metronome, 125);
};

Machine.prototype.stopLoop = function() {
  this.playing = false;
  clearInterval(this.loop);
};

Machine.prototype.toggleStep = function(index) {
  if (this.boolArray[index]) {
    this.boolArray[index] = false;
  } else {
    this.boolArray[index] = true;
  }
};

exports.MachineModule = Machine;

//Front-End Emulation
var machine = new Machine();
machine.toggleStep(1);

},{}],2:[function(require,module,exports){
var Machine = require('./../js/machine.js').MachineModule;
var machine = new Machine();

$(function() {
  machine.createSounds("bass1");
  machine.createSounds("cymbal1");
  for (var i = 1; i <= machine.steps; i++) {
    $("#steps").append('<div class="step-unselected" id="col' + i + 'row1"></div>');
  }
  $("#toggle").click(function() {
    if (machine.playing) {
      machine.stopLoop();
    } else {
      machine.toggleLoop();
    }
  });
});

},{"./../js/machine.js":1}]},{},[2]);
