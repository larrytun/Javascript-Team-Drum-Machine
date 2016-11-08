var Machine = require('./../js/machine.js').MachineModule;
var machine = new Machine();

$(function() {
  $("#bpm").text(machine.BPM + ' BPM');
  for (var i = 1; i <= machine.steps; i++) {
    $(".row1").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row2").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row3").append('<div class="step-unselected col' +i+ '"></div>');
    $(".row4").append('<div class="step-unselected col' +i+ '"></div>');
  }
  $("#toggle").click(function() {
    if (machine.playing) {
    } else {
      machine.toggleLoop();
    }
  });

  $("#stopbutton").click(function() {
    machine.stopLoop();
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
