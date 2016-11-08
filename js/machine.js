function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.boolArray = [false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false];
  this.allSounds = [];
  this.BPM = 120;
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

Machine.prototype.getNoteDuration = function() {
  var ms = 60000/this.BPM;
  var s = ms * 4;
  var noteDuration = s/16;
  return noteDuration;
};

Machine.prototype.toggleLoop = function() {
  var _this = this;
  function metronome() {
    if( _this.i === _this.steps) {
      _this.i = 0;
    }
    for (var i = 0; i < _this.allSounds.length; i++) {
      if (_this.boolArray[_this.i]) {
        _this.allSounds[i][_this.i].play();
      }
    }
    _this.i++;
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
};

Machine.prototype.subtractBPM = function() {
  this.BPM--;
};

exports.MachineModule = Machine;

//Front-End Emulation
var machine = new Machine();
machine.toggleStep(1);
