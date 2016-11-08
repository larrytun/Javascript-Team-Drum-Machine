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
  for (var i = 1; i <= machine.steps; i++) {
    $("#steps").append('<div class="step-unselected" id="col' + i + 'row1"></div>');
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
});
