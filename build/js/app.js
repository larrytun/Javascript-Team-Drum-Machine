(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.boolArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  this.BPM = 120;
}

Machine.prototype.getNoteDuration = function() {
  var ms = 60000/this.BPM;
  var s = ms * 4;
  var noteDuration = s/16;
  return noteDuration;
};

Machine.prototype.toggleLoop = function() {
  var _this = this;
  function metronome() {
    if( _this.i < _this.steps) {
      console.log(_this.i);
      console.log("If: " + _this.boolArray[_this.i]);

      if (_this.i%8 === 0) {
        var bass8 = document.getElementById("bass8");
        bass8.play();
      } else if(_this.i%7 === 0){
        var bass7 = document.getElementById("bass7");
        bass7.play();
      } else if(_this.i%6 === 0) {
        var bass6 = document.getElementById("bass6");
        bass6.play();
      } else if(_this.i%5 === 0){
        var bass5 = document.getElementById("bass5");
        bass5.play();
      } else if(_this.i%4 === 0) {
        var bass4 = document.getElementById("bass4");
        bass4.play();
      } else if(_this.i%3 === 0) {
        var bass3 = document.getElementById("bass3");
        bass3.play();
      } else if(_this.i%2 === 0) {
        var bass2 = document.getElementById("bass2");
        bass2.play();
      } else{
        var bass1 = document.getElementById("bass1");
        bass1.play();
      }
      _this.i++;
    } else {
      var bass1 = document.getElementById("cymbal1");
      bass1.play();
      _this.i = 0;
      _this.i++;
      console.log("Else " + _this.boolArray[_this.i]);
    }
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
}

Machine.prototype.subtractBPM = function() {
  this.BPM--;
}

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
  $("#bpm").text(machine.BPM + ' BPM');
  for (var i = 1; i <= machine.steps; i++) {
    $(".row1").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row2").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row3").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row4").append('<div class="step-unselected col' +i+ '"></div>');
  }
  $("#toggle").click(function() {
    createSounds("bass1");
    //
    // if (machine.playing) {
    //   machine.stopLoop();
    // } else {
    //   machine.toggleLoop();
    // }
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
