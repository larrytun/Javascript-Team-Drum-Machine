(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Instrument(sound) {
  this.sound = sound;
  this.soundArray = [];
  this.boolArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  this.generateSounds(sound);
}

Instrument.prototype.generateSounds = function(thisSound) {
  for (var i = 0; i < 16; i++) {
    $("#sounds").append("<audio src='public/sounds/" + this.sound + ".WAV' id='" + this.sound + i + "' controls></audio>");
    var sound = document.getElementById(this.sound + i);
    this.soundArray.push(sound);
  }
};

Instrument.prototype.toggleStep = function(index) {
  if (this.boolArray[index]) {
    this.boolArray[index] = false;
  } else {
    this.boolArray[index] = true;
  }
};

exports.InstrumentModule = Instrument;

},{}],2:[function(require,module,exports){
var Instrument = require('./../js/instrument.js').InstrumentModule;

function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.allInstruments = [];
  this.BPM = 120;
}

Machine.prototype.addInstrument = function(instrumentName) {
  var instrument = new Instrument(instrumentName);
  this.allInstruments.push(instrument);
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
    for (var i = 0; i < _this.allInstruments.length; i++) {
      if (_this.allInstruments[i].boolArray[_this.i]) {
        // console.log(_this.allInstruments[i].soundArray);
        _this.allInstruments[i].soundArray[_this.i].play();
      }
    }
    _this.i++;
    // this.getNoteDuration();
  }
  this.playing = true;
  this.loop = setInterval(metronome, this.getNoteDuration());
};

Machine.prototype.stopLoop = function() {
  this.playing = false;
  clearInterval(this.loop);
};

Machine.prototype.addBPM = function() {
  this.BPM += 1;
};

Machine.prototype.subtractBPM = function() {
  this.BPM--;
};

exports.MachineModule = Machine;

//Front-End Emulation

},{"./../js/instrument.js":1}],3:[function(require,module,exports){
var Machine = require('./../js/machine.js').MachineModule;
var Instrument = require('./../js/instrument.js').InstrumentModule;

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
  machine.addInstrument("bass2");
  machine.addInstrument("cymbal1");
  machine.allInstruments[0].toggleStep(0);
  machine.allInstruments[0].toggleStep(4);
  machine.allInstruments[0].toggleStep(8);
  machine.allInstruments[0].toggleStep(12);
  machine.allInstruments[1].toggleStep(3);
  machine.allInstruments[1].toggleStep(7);
  machine.allInstruments[1].toggleStep(11);

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

},{"./../js/instrument.js":1,"./../js/machine.js":2}]},{},[3]);
