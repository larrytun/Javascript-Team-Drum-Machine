var Instrument = require('./../js/instrument.js').InstrumentModule;

function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.allInstruments = [];
  this.Bpm = 120;
}

Machine.prototype.addInstrument = function(instrumentName) {
  var instrument = new Instrument(instrumentName);
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
}

exports.MachineModule = Machine;

//Front-End Emulation
