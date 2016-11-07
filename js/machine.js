exports.MachineModule = Machine;

var steps = 16;
var i = 0;
var playing = false;

Machine.prototype.toggleLoop = function() {
  var loop;
  if (!this.playing) {
    loop = setInterval(integerPrint, 125);
    this.playing = true;
  } else {
    clearInterval(loop);
    this.playing = false;
  }
};

Machine.prototype.integerPrint = function() {
  if( i < steps) {
    i++;
    console.log(i);
  } else {
    i = 0;
    i++;
    console.log(i);
  }
};
