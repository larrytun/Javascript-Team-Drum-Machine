function Machine() {
  this.steps = 16;
  this.i = 0;
  this.playing = false;
}

Machine.prototype.toggleLoop = function() {
  var loop;
  if (!this.playing) {
    loop = setInterval(this.integerPrint, 125);
    this.playing = true;
  } else {
    clearInterval(loop);
    this.playing = false;
  }
};

Machine.prototype.integerPrint = function() {
  console.log("Steps" + this.steps);
  console.log("i" + this.i);
  if( this.i < this.steps) {
    this.i++;
    console.log("IF" + this.i);
  } else {
    this.i = 0;
    this.i++;
    console.log("Else" + this.i);
  }
};

exports.MachineModule = Machine;
