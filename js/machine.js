function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
  this.loop;
}

Machine.prototype.toggleLoop = function() {
  // console.log(this.playing);
  var _this = this;
  function integerPrint() {
    if( _this.i < _this.steps) {
      _this.i++;
      console.log("IF " + _this.i);
    } else {
      _this.i = 0;
      _this.i++;
      console.log("Else " + _this.i);
    }
  }
  console.log("Toggle Loop Playing: " + this.playing);
  this.playing = true;
  console.log("Toggle Loop Playing: " + this.playing);
  this.loop = setInterval(integerPrint, 125);
};

Machine.prototype.stopLoop = function() {
  console.log("Stop Loop Playing: " + this.playing);
  this.playing = false;
  console.log("Stop Loop Playing: " + this.playing);
  console.log(this.loop);
  clearInterval(this.loop);
};

exports.MachineModule = Machine;
