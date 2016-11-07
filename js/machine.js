function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
  this.boolArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
}

Machine.prototype.toggleLoop = function() {
  var _this = this;
  function metronome() {
    if( _this.i < _this.steps) {
      _this.i++;
      console.log("If: " + _this.boolArray[_this.i]);
    } else {
      _this.i = 0;
      _this.i++;
      console.log("Else " + _this.boolArray[_this.i]);
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
