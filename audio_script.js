

//Elements:
var $source = $("#audiotrack")[0],
    $track = $("#track"),
    $progress = $("#progress"),
    $play = $("#play"),
    $pause = $("#pause"),
    $playPause = $("#play, #pause"),
    $stop = $("#stop"),
    $mute = $("#mute"),
    $volume = $("#volume"),
    $level = $("#level");

//Vars:
var totalTime,
    timeBar,
    newTime,
    volumeBar,
    newVolume,
    cursorX;

var interval = null;


$(document).ready(function(){
//===================
//===================
//Track:
//===================
//===================

//Progress bar:
function barState(){
  if (!$source.ended){
    var totalTime = parseInt($source.currentTime / $source.duration * 100);
    $progress.css({"width": totalTime+1 + "%"});
  }
  else if ($source.ended){
    $play.show();
    $pause.hide();
    clearInterval(interval);
  };
  console.log("playing...");
};

//Event trigger:
$track.click(function(e){
  if (!$source.paused){
    var timeBar = $track.width();
    var cursorX = e.pageX - $track.offset().left;
    var newTime = cursorX * $source.duration / timeBar;
    $source.currentTime = newTime;
    $progress.css({"width": cursorX + "%"});
  };
});


//===================
//===================
//Button (Play-Pause):
//===================
//===================

$("#pause").hide();

function playPause(){
  if ($source.paused){
    $source.play();
    $pause.show();
    $play.hide();
    interval = setInterval(barState, 50); //Active progress bar.
    console.log("play");
  }
  else {
    $source.pause();
    $play.show();
    $pause.hide();
    clearInterval(interval);
    console.log("pause");
  };
};

$playPause.click(function(){
  playPause();
});


//===================
//===================
//Button (Stop):
//===================
//===================
function stop(){
  $source.pause();
  $source.currentTime = 0;
  $progress.css({"width": "0%"});
  $play.show();
  $pause.hide();
  clearInterval(interval);
};

$stop.click(function(){
  stop();
});


//===================
//===================
//Button (Mute):
//===================
//===================
function mute(){
  if ($source.muted){
    $source.muted = false;
    $mute.removeClass("mute");
    console.log("soundOFF");
  }
  else {
    $source.muted = true;
    $mute.addClass("mute");
    console.log("soundON");
  };
};

$mute.click(function(){
  mute();
});


//===================
//===================
//Volume bar:
//===================
//===================
$volume.click(function(e){
  var volumeBar = $volume.width();
  var cursorX = e.pageX - $volume.offset().left;
  var newVolume = cursorX / volumeBar;
  $source.volume = newVolume;
  $level.css({"width": cursorX + "px"});
  $source.muted = false;
  $mute.removeClass("mute");
});


}); //Document ready end.