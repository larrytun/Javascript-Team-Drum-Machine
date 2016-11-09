var Machine = require('./../js/machine.js').MachineModule;
var Instrument = require('./../js/instrument.js').InstrumentModule;

var machine = new Machine();
var savedBeats;

function selectStep(p, q){
  return function(){
    console.log("select" + p + " " + q);
    $("#row" + p + "col" + q).toggleClass("step-selected");
    machine.allInstruments[p-1].toggleStep(q-1);
  };
}

var beatColumn = function(_i){
  $(".col" + (_i+1)).addClass("col-beat");
  $(".col" + _i).removeClass("col-beat");
  if (_i===0) {
    $(".col" + (16)).removeClass("col-beat");
  }
  _i++;
};

$(function() {
  machine.addInstrument("BD7525");
  machine.addInstrument("cymbal1");
  machine.addInstrument("CB");
  machine.addInstrument("HANDCLP1");
  machine.addInstrument("MA");
  machine.addInstrument("HC10");

  $("#bpm").text(machine.Bpm + ' BPM');

  var rows = machine.allInstruments.length;
  var cols = 16;

  for (var i = 1; i < rows+1; i++) {
    row = ".row" + i;
    $("#track-area").append(
      '<img src="public/img/instrument-display.png" id="instrument' + i + '"/>' +
    '<div class="instrument-name"><h2>' + machine.allInstruments[i-1].sound + '</h2></div>' +
    '<div class="row'+ i + '"></div>');
    for (var j = 1; j < machine.steps + 1; j++) {
      $(row).append('<div id="row'+i+'col'+j+'" class="step-unselected col' +j+ '"></div>');
    // console.log('<div id="row'+i+'col'+j+'" class="step-unselected col' +j+ '"></div>');
    }
  }

  console.log(rows);
  console.log(cols);
  for (var p = 1; p <= rows; p++){
    for (var q = 1; q <= cols; q++) {
      $("#row" + p + "col" + q).click(selectStep(p, q));
    }
  }

  $("#toggle").click(function() {
    if (machine.playing) {
      machine.stopLoop();
    } else {
      machine.toggleLoop(beatColumn);
    }
  });

  $("#tempobuttonup").click(function() {
    machine.addBpm();
    $("#bpm").text(machine.Bpm + ' BPM');
  });

  $("#tempobuttondn").click(function() {
    machine.subtractBpm();
    $("#bpm").text(machine.Bpm + ' BPM');
  });

  $("#tempodisplay").click(function() {
    $("#bpmEntry").show();
  });

  $("#bpm").click(function() {
    $("#bpmEntry").show();
  });

  $("#bpmEntry").click(function() {
    $("#bpmEntry").show();
  });

  $('#bpmEntry').keypress(function(e){
        if(e.keyCode==13)
        $('#submit').click();
      });

  $("#bpmForm").submit(function() {
    event.preventDefault();
    var newBpm = parseInt($("#bpmEntry").val());
    machine.setBpm(newBpm);
    $("#bpmEntry").hide();
    $("#bpm").text(machine.Bpm + ' BPM');
  });

  $("#save-form").submit(function(){
    event.preventDefault();
    var songName = $("#track-name").val();
    $("#track-name").val("");
    machine.name = songName;
    // WRITE TO FIREBASE
    var beatsRef = firebase.database().ref('beats');
    beatsRef.push(machine);
    // READ FROM FIREBASE
    beatsRef.once('value').then(function(snapshot){
      savedBeats = JSON.parse(JSON.stringify(snapshot.val()));
      console.log(savedBeats);
    }).then(function(){
      for (var i = 0; i < savedBeats.length; i++) {
        $(".tracks-list").append(savedBeats[i].name);
      }
    });

  });

});
