var Machine = require('./../js/machine.js').MachineModule;
var Instrument = require('./../js/instrument.js').InstrumentModule;

var machine = new Machine();

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
  for (var i = 1; i <= machine.steps; i++) {
    $(".row1").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row2").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row3").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row4").append('<div class="step-unselected col' +i+ '"></div>');
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
