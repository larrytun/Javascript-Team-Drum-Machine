(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Instrument(sound, displayName) {
  this.sound = sound;
  this.displayName = displayName;
  this.soundArray = [];
  this.boolArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  this.generateSounds(sound);
}

Instrument.prototype.generateSounds = function(thisSound) {
  for (var i = 0; i < 16; i++) {
    $("#sounds").append("<audio src='public/sounds/" + this.sound + ".WAV' id='" + this.sound + i + "'></audio>");
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
  this.Bpm = 120;
}

Machine.prototype.addInstrument = function(sound, instrumentName) {
  var instrument = new Instrument(sound, instrumentName);
  this.allInstruments.push(instrument);
};

Machine.prototype.getNoteDuration = function() {
  var ms = 60000/this.Bpm;
  var s = ms * 4;
  var noteDuration = s/16;
  return noteDuration;
};

Machine.prototype.toggleLoop = function(_beatColumn) {
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
    _beatColumn(_this.i);
    _this.i++;
  }
  this.playing = true;
  this.loop = setInterval(metronome, this.getNoteDuration());
};

Machine.prototype.stopLoop = function() {
  this.playing = false;
  clearInterval(this.loop);
};

Machine.prototype.addBpm = function() {
  this.Bpm += 1;
};

Machine.prototype.subtractBpm = function() {
  this.Bpm--;
};

Machine.prototype.setBpm = function(newBpm) {
  console.log("bpm " + newBpm);
  this.Bpm = newBpm;
}

exports.MachineModule = Machine;

//Front-End Emulation

},{"./../js/instrument.js":1}],3:[function(require,module,exports){
var Machine = require('./../js/machine.js').MachineModule;
var Instrument = require('./../js/instrument.js').InstrumentModule;

var machine = new Machine();

function selectStep(p, q){
  return function(){
    console.log("select" + p + " " + q);
    $("#row" + p + "col" + q).toggleClass("step-selected");
    machine.allInstruments[p-1].toggleStep(q-1);
  };
}


var beatColumn = function(_i){
  $(".col" + (_i+1)).addClass("col-beat");
  $(".col" + _i).removeClass("col-beat");
  if (_i===0) {
    $(".col" + (16)).removeClass("col-beat");
  }
  _i++;
}

$(function() {
  machine.addInstrument("BD7525", "Kick");
  machine.addInstrument("cymbal1", "Cymbal");
  machine.addInstrument("CB", "Cowbell");
  machine.addInstrument("HANDCLP1", "Clap");
  machine.addInstrument("MA", "Shaker");
  machine.addInstrument("HC10", "Boop");

  $("#bpm").text(machine.Bpm + ' BPM');

  var rows = machine.allInstruments.length;
  var cols = 16;

  for (var i = 1; i < rows+1; i++) {
    row = ".row" + i;
    $("#track-area").append(
      '<img src="public/img/instrument-display.png" id="instrument' + i + '"/>' +
    '<div class="instrument-name"><div id="displayName"><h2 id="displayN">' + machine.allInstruments[i-1].displayName + '</h2></div></div>' +
    '<div class="row'+ i + '"></div>');
    for (var j = 1; j < machine.steps + 1; j++) {
      $(row).append('<div id="row'+i+'col'+j+'" class="step-unselected col' +j+ '"></div>');
    // console.log('<div id="row'+i+'col'+j+'" class="step-unselected col' +j+ '"></div>');
    }
  }

  console.log(rows);
  console.log(cols);
  for (var p = 1; p <= rows; p++){
    for (var q = 1; q <= cols; q++) {
      $("#row" + p + "col" + q).click(selectStep(p, q));
    }
  }

  $("#toggle").click(function() {
    if (machine.playing) {
    } else {
      machine.toggleLoop(beatColumn);
    }
  });

  $("#stopbutton").click(function() {
    machine.stopLoop();
  });

  $("#tempobuttonup").click(function() {
    machine.addBpm();
    $("#bpm").text(machine.Bpm + ' BPM');
  });

  $("#tempobuttondn").click(function() {
    machine.subtractBpm();
    $("#bpm").text(machine.Bpm + ' BPM');
  });

  $("#tempodisplay").click(function() {
    $("#bpmEntry").show();
  });

  $("#bpm").click(function() {
    $("#bpmEntry").show();
  });

  $("#bpmEntry").click(function() {
    $("#bpmEntry").show();
  });

  $('#bpmEntry').keypress(function(e){
    if(e.keyCode==13) {
      $('#submit').click();
    }
  });

  $("#bpmForm").submit(function() {
    event.preventDefault();
    var newBpm = parseInt($("#bpmEntry").val());
    machine.setBpm(newBpm);
    $("#bpmEntry").hide();
    $("#bpm").text(machine.Bpm + ' BPM');
  });
});

},{"./../js/instrument.js":1,"./../js/machine.js":2}]},{},[3]);
