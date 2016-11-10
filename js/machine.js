var Instrument = require('./../js/instrument.js').InstrumentModule;

function Machine() {
  this.id;
  this.name;
  this.producer;
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.allInstruments = [];
  this.Bpm = 120;
}

Machine.prototype.addInstrument = function(sound, instrumentName) {
  var instrument = new Instrument(sound, instrumentName);
  this.allInstruments.push(instrument);
};

Machine.prototype.getNoteDuration = function() {
  var ms = 60000/this.Bpm;
  var s = ms * 4;
  var noteDuration = s/16;
  return noteDuration;
};

Machine.prototype.toggleLoop = function(_beatColumn) {
  var _this = this;
  function metronome() {
    if( _this.i === _this.steps) {
      _this.i = 0;
    }
    for (var i = 0; i < _this.allInstruments.length; i++) {
      if (_this.allInstruments[i].boolArray[_this.i]) {
        // console.log(_this.allInstruments[i].soundArray);
        _this.allInstruments[i].soundArray[_this.i].play();
      }
    }
    _beatColumn(_this.i);
    _this.i++;
  }
  this.playing = true;
  this.loop = setInterval(metronome, this.getNoteDuration());
};

Machine.prototype.stopLoop = function() {
  this.playing = false;
  this.i = 0;
  clearInterval(this.loop);
};

Machine.prototype.pauseLoop = function() {
  this.playing = false;
  clearInterval(this.loop);
};

Machine.prototype.addBpm = function() {
  this.Bpm += 1;
};

Machine.prototype.subtractBpm = function() {
  this.Bpm--;
};

Machine.prototype.setBpm = function(newBpm) {
  console.log("bpm " + newBpm);
  this.Bpm = newBpm;
};

Machine.prototype.clear = function(_clearSelected){
  for (var i = 0; i < this.allInstruments.length; i++) {
    this.allInstruments[i].clear();
  }
  this.name= "";
  this.producer= "";
  this.i = 0;
  this.Bpm = 120;
  this.playing = false;
  _clearSelected();
};

exports.MachineModule = Machine;

//Front-End Emulation
