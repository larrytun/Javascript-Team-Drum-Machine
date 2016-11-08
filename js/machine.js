function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.boolArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  this.allSounds = [];
}

Machine.prototype.createSounds = function(_sound){
  var soundArray = [];
  for (var i = 0; i < 16; i++) {
    $("#sounds").append("<audio src='public/sounds/" + _sound + ".WAV' id='" + _sound + i + "' controls></audio>");
    var sound = document.getElementById(_sound + i);
    soundArray.push(sound);
  }
  this.allSounds.push(soundArray);
};

Machine.prototype.toggleLoop = function() {
  var _this = this;
  function metronome() {
    if( _this.i < _this.steps) {
      console.log(_this.i);
      console.log(_this.allSounds[0][_this.i]);
      for (var i = 0; i < _this.allSounds.length; i++) {
          console.log();
          _this.allSounds[i][_this.i].play();
      }
      _this.i++;
    } else {
      _this.i = 0;
      _this.i++;
    }
  }
  this.playing = true;
  this.loop = setInterval(metronome, 125);
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

exports.MachineModule = Machine;

//Front-End Emulation
var machine = new Machine();
machine.toggleStep(1);
