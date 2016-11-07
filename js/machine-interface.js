var machine = require('./../js/machine.js').MachineModule;

$(function() {
  $("#toggle").click(function() {
    machine.toggleLoop();
  });
});
