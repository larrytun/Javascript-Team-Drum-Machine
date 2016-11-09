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
}


function selectStep(p, q){
  return function(){
    $("#row" + p + "col" + q).toggleClass("step-selected");
    machine.allInstruments[p-1].toggleStep(q-1);
  };
}

$(function() {
  machine.addInstrument("bass2");
  machine.addInstrument("cymbal1");
  machine.addInstrument("CB");
  machine.addInstrument("LTAD7");
  machine.addInstrument("OPCL2");
  machine.addInstrument("RIDED8");

  $("#bpm").text(machine.BPM + ' BPM');

  var rows = machine.allInstruments.length;
  var cols = 16;

  for (var i = 1; i < rows+1; i++) {
    row = ".row" + i;
    $("#track-area").append(
      '<img src="public/img/instrument-display.png" id="instrument' + i + '"/>' +
    '<div class="instrument-name"><h2>' + machine.allInstruments[i-1].sound + '</h2></div>' +
    '<div class="row'+ i + '"></div>');
    for (var j = 1; j < machine.steps + 1; j++) {
      $(row).append('<div id="row'+i+'col'+j+'" class="step-unselected col' +j+ '"></div>');
    // console.log('<div id="row'+i+'col'+j+'" class="step-unselected col' +j+ '"></div>');
    }
  }





  for (var p = 1; p < rows+1; p++){
    for (var q = 1; q < cols+1; q++) {
      console.log(p);
      console.log(q);
      $("#row" + p + "col" + q).click(selectStep(p, q));
    }
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
