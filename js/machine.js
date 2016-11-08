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
      console.log(_this.i);
      console.log("If: " + _this.boolArray[_this.i]);

      if (_this.i%8 === 0) {
        var bass8 = document.getElementById("bass8");
        bass8.play();
      } else if(_this.i%7 === 0){
        var bass7 = document.getElementById("bass7");
        bass7.play();
      } else if(_this.i%6 === 0) {
        var bass6 = document.getElementById("bass6");
        bass6.play();
      } else if(_this.i%5 === 0){
        var bass5 = document.getElementById("bass5");
        bass5.play();
      } else if(_this.i%4 === 0) {
        var bass4 = document.getElementById("bass4");
        bass4.play();
      } else if(_this.i%3 === 0) {
        var bass3 = document.getElementById("bass3");
        bass3.play();
      } else if(_this.i%2 === 0) {
        var bass2 = document.getElementById("bass2");
        bass2.play();
      } else{
        var bass1 = document.getElementById("bass1");
        bass1.play();
      }
      _this.i++;
    } else {
      var bass1 = document.getElementById("cymbal1");
      bass1.play();
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
