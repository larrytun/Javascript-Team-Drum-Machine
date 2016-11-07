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
