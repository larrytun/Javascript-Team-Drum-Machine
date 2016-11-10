function Instrument(sound, displayName) {
  this.sound = sound;
  this.displayName = displayName;
  this.soundArray = [];
  this.boolArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  this.generateSounds(sound);
}

Instrument.prototype.clear = function(){
  this.boolArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
};

Instrument.prototype.generateSounds = function(thisSound) {
  for (var i = 0; i < 16; i++) {
    $("#sounds").append("<audio src='public/sounds/" + this.sound + ".WAV' id='" + this.sound + i + "'></audio>");
    var sound = document.getElementById(this.sound + i);
    this.soundArray.push(sound);
  }
};

Instrument.prototype.toggleStep = function(index) {
  if (this.boolArray[index]) {
    this.boolArray[index] = false;
  } else {
    this.boolArray[index] = true;
  }
};

exports.InstrumentModule = Instrument;
