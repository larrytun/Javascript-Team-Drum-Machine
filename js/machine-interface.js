var Machine = require('./../js/machine.js').MachineModule;
var Instrument = require('./../js/instrument.js').InstrumentModule;

var machine = new Machine();
var savedBeats = [];
var beatsRef = firebase.database().ref('beats');

var selectStep = function (p, q){
  return function(){
    console.log("select" + p + " " + q);
    $("#row" + p + "col" + q).toggleClass("step-selected");
    machine.allInstruments[p-1].toggleStep(q-1);
  };
};

var beatColumn = function(_i){
  $(".col" + (_i+1)).addClass("col-beat");
  $(".col" + _i).removeClass("col-beat");
  if (_i===0) {
    $(".col" + (16)).removeClass("col-beat");
  }
  _i++;
};

var clearSelected = function(){
  for (var i = 0; i < 16; i++) {
    $(".column").removeClass("step-selected");
    $(".column").removeClass("col-beat");
  }
  $("#bpm").text(machine.Bpm + ' BPM');
};

var clickableSavedBeats = function(_id, _selectStep){
  $("#track-" + _id).click(function(){
    for (var i = 0; i < savedBeats.length; i++) {
      if (savedBeats[i].id === _id) {
        console.log(machine);
        machine.name = savedBeats[i].name;
        machine.producer = savedBeats[i].producer;
        machine.setBpm(savedBeats[i].Bpm);
        $("#bpm").text(machine.Bpm + ' BPM');
        $(".speech-bubble").hide();
        $(".speechText").hide();
        machine.i = 0;
        machine.clear(clearSelected);
        for (var x = 0; x < savedBeats[i].allInstruments.length; x++) {
          for (var y = 0; y < savedBeats[i].allInstruments[x].boolArray.length; y++) {
            if (savedBeats[i].allInstruments[x].boolArray[y]) {
              console.log("select" + x + " " + y);
              $("#row" + (x+1) + "col" + (y+1)).toggleClass("step-selected");
              machine.allInstruments[x].toggleStep(y);
            }
          }
        }
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
      clickableSavedBeats(beat.id, selectStep);
    });
  });
};


$(function() {

  readDatabase();
  machine.addInstrument("BD7525", "Kick");
  machine.addInstrument("cymbal1", "Cymbal");
  machine.addInstrument("CB", "Cowbell");
  machine.addInstrument("HANDCLP1", "Clap");
  machine.addInstrument("MA", "Shaker");
  machine.addInstrument("HC10", "Boop");
  machine.addInstrument("SD2510", "Snare");

  $("#bpm").text(machine.Bpm + ' BPM');

  var rows = machine.allInstruments.length;
  var cols = 16;

  for (var i = 1; i < rows+1; i++) {
    row = ".row" + i;
    $("#track-area").append(
      '<img src="public/img/instrument-display.png" id="instrument' + i + '"/>' +
    '<div class="instrument-name"><div id="displayName"><h2 id="displayN">' + machine.allInstruments[i-1].displayName + '</h2></div></div>' +
    '<div class="row'+ i + '"></div>');
    for (var j = 1; j < machine.steps + 1; j++) {
      $(row).append('<div id="row'+i+'col'+j+'" class="column step-unselected col' +j+ '"></div>');
    // console.log('<div id="row'+i+'col'+j+'" class="step-unselected col' +j+ '"></div>');
    }
  }

  for (var p = 1; p <= rows; p++){
    for (var q = 1; q <= cols; q++) {
      $("#row" + p + "col" + q).click(selectStep(p, q));
    }
  }

  $("#toggle").click(function() {
    $(".speech-bubble").hide();
    $(".speechText").hide();
    $("#bpm").text(machine.Bpm + ' BPM');
    if (machine.playing) {
    } else {
      $('.frown').hide();
      machine.toggleLoop(beatColumn);
    }
  });

  $("#stopbutton").click(function() {
    machine.stopLoop();
    $(".column").removeClass("col-beat");
    $('.frown').show();
  });

  $(".pausebutton").click(function() {
    machine.pauseLoop();
    $('.frown').show();
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

  $("#round-bar").click(function() {
    if (confirm("Are you sure? You will lose all current unsaved data!")) {
      machine.clear(clearSelected);
    }
  });

  $('#bpmEntry').keypress(function(e){
    if(e.keyCode==13) {
      $('#submit').click();
    }
  });

  $("#bpmForm").submit(function() {
    event.preventDefault();
    var newBpm = parseInt($("#bpmEntry").val());
    if (!(isNaN(newBpm)) && newBpm < 220 && newBpm > 0) {
      machine.setBpm(newBpm);
      $("#bpmEntry").hide();
      $("#bpm").text(machine.Bpm + ' BPM');
      $(".speech-bubble").hide();
      $(".speechText").hide();
      if (!(machine.playing)) {
        $('.frown').show();
      }
    } else {
      $('.frown').hide();
      $(".speech-bubble").show();
      $(".speechText").show();
    }
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
