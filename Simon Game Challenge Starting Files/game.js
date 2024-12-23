var userClick = [];
var gameClick = [];
var colors = ["green", "red", "yellow", "blue"];
var level = 0;
var start = false;

function gameTurn() {
  userClick = [];
  level++;
  $("#level-title").text("level " + level);
  randomNum = Math.floor(Math.random() * 4);
  randomColor = colors[randomNum];
  gameClick.push(randomColor);
  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  sound(randomColor);
  userTurn();
}
function sound(colorName) {
  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}
function userTurn() {
  $(".btn").off("click");
  $(".btn").click(function () {
    clickedColor = $(this).attr("id");
    $("#" + clickedColor).addClass("pressed");
    setTimeout(() => {
      $("#" + clickedColor).removeClass("pressed");
    }, 100);
    userClick.push(clickedColor);
    checkAnswer(userClick, gameClick, userClick.length - 1);
  });
}

function checkAnswer(userClick, gameClick, i) {
  if (userClick[i] === gameClick[i]) {
    sound(clickedColor);
    if (userClick.length === gameClick.length) {
      setTimeout(() => {
        gameTurn();
      }, 1000);
    } else {
      userTurn();
    }
  } else {
    sound("wrong");
    gameOver();
  }
}
function gameOver() {
  $("#level-title").text("Game over");
  userClick = [];
  gameClick = [];
  start = false;
  level = 0;
}

$(document).keypress(function () {
  if (!start) {
    $("#level-title").text("level " + level);
    start = true;
    gameTurn();
  }
});
