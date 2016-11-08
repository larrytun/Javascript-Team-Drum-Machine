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
  machine.allInstruments[1].toggleStep(15);

  $("#bpm").text(machine.BPM + ' BPM');
  for (var i = 1; i <= 4; i++) {
    row = ".row" + i;
    for (var j = 1; j <= machine.steps; j++) {
      $(row).append('<div id="row'+i+'col'+j+'" class="step-unselected col' +j+ '"></div>');
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
