var Machine = require('./../js/machine.js').MachineModule;

$(function() {
  $("#toggle").click(function() {
    var machine = new Machine();
    machine.toggleLoop();
  });
});
