var Machine = require('./../js/machine.js').MachineModule;
var Instrument = require('./../js/instrument.js').InstrumentModule;

var machine = new Machine();
var savedBeats = [];
var beatsRef = firebase.database().ref('beats');

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

var clickableSavedBeats = function(_id){
  $("#track-" + _id).click(function(){
    for (var i = 0; i < savedBeats.length; i++) {
      if (savedBeats[i].id === _id) {
        machine = savedBeats[i];
        console.log(machine);
      }
    }
  });
};

var clickFunction = function(_id){
  console.log(_id);
  for (var i = 0; i < savedBeats.length; i++) {
    if (savedBeats[i].id === _id) {
      machine = savedBeats[i];
    }
  }
};

var readDatabase = function(){
  beatsRef.once('value').then(function(snapshot){
    var databaseBeats = JSON.parse(JSON.stringify(snapshot.val()));
    savedBeats = [];
    Object.keys(databaseBeats).forEach(function(key) {
      savedBeats.push(databaseBeats[key]);
      savedBeats[savedBeats.length-1].id = key;
    });
    $(".tracks-list").html("");
    savedBeats.forEach(function(beat){
      $(".tracks-list").append("<li id='track-" + beat.id + "'>" + beat.name + " by: <em>" + beat.producer + "</em></li>");
      clickableSavedBeats(beat.id);
    });
  });
};


$(function() {
  readDatabase();
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
    var producerName = $("#producer-name").val();
    $("#track-name").val("");
    $("#producer-name").val("");
    machine.name = songName;
    machine.producer = producerName;
    // WRITE TO FIREBASE
    beatsRef.push(machine);
    // READ FROM FIREBASE
    readDatabase();
  });




});
