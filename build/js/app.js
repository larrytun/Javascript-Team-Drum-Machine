(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.boolArray = [false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false];
  this.allSounds = [];
  this.BPM = 120;
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

Machine.prototype.getNoteDuration = function() {
  var ms = 60000/this.BPM;
  var s = ms * 4;
  var noteDuration = s/16;
  return noteDuration;
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
  this.loop = setInterval(metronome, _this.getNoteDuration());
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

Machine.prototype.addBPM = function() {
  this.BPM += 1;
};

Machine.prototype.subtractBPM = function() {
  this.BPM--;
};

exports.MachineModule = Machine;

//Front-End Emulation
var machine = new Machine();
machine.toggleStep(1);

},{}],2:[function(require,module,exports){
var Machine = require('./../js/machine.js').MachineModule;
var machine = new Machine();

var allSounds = [];


function createSounds(_sound){
  var soundArray = [];
  for (var i = 0; i < 16; i++) {
    $("#sounds").append("<audio src='public/sounds/" + _sound + ".WAV' id='" + _sound + i + "' controls></audio>");
    var sound = document.getElementById(_sound + i);
    soundArray.push(sound);
  }
  allSounds.push(soundArray);
  console.log(allSounds);
}

$(function() {
  machine.createSounds("bass1");
  machine.createSounds("cymbal1");
  $("#bpm").text(machine.BPM + ' BPM');
  for (var i = 1; i < 8+1; i++) {
    row = ".row" + i;
    $("#track-area").append(
      '<img src="public/img/instrument-display.png" id="instrument' + i + '"/>'
    + '<div class="instrument-name"><h2>SOUND</h2></div>'
    + '<div class="row'+ i + '"></div>');
    for (var j = 1; j < machine.steps + 1; j++) {
      console.log(row);
      $(row).append('<div class="step-unselected col' +j+ '"></div>');
    }

    // $(".row2").append('<div class="step-unselected col' +i+ '"></div>');
    // $(".row3").append('<div class="step-unselected col' +i+ '"></div>');
    // $(".row4").append('<div class="step-unselected col' +i+ '"></div>');
  }
  $("#toggle").click(function() {
    if (machine.playing) {
      machine.stopLoop();
    } else {
      machine.toggleLoop();
    }
  });

  $("#tempobuttonup").click(function() {
    machine.addBPM();
    $("#bpm").text(machine.BPM + ' BPM');
  });

  $("#tempobuttondn").click(function() {
    machine.subtractBPM();
    $("#bpm").text(machine.BPM + ' BPM');
  });
});

},{"./../js/machine.js":1}]},{},[2]);
