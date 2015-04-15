//bowling
'use strict';

global.jQuery = global.$ = require('jquery');
var Game = require('./bowling');

var startGame = function() {
  $('.content').children().remove()
  $('.content').append(gameCard);

  var bowling = new Game();

  //set up frames!
  for (var i = 0; i < 10; i++) {
    if (i == 9) {
      $('.score-holder').append(scoreBoxLast);
    } else {
      $('.score-holder').append(scoreBox);
    }
  }

  $('.score-box:eq(0)').addClass('active');

  bowling.handleNewFrame = function() {
    $('.score-box').each(function() {
      $(this).removeClass('active');
    })
    $('.score-box:eq('+[bowling.frameIndex]+')').addClass('active');
  }

  //overide score showing
  bowling.handleScores = function(currentFrame) {
    console.log(currentFrame);
    console.log(bowling.frameIndex);
    //$('.msg:eq(' + bowling.frameIndex + ')').hide();
    if (currentFrame[0] !== null) {
      $('.first-score:eq(' + bowling.frameIndex + ')').text(currentFrame[0]);
    } if(currentFrame[1] !== null) {
      $('.second-score:eq(' + bowling.frameIndex + ')').text(currentFrame[1]);
    } if(currentFrame[3] !== null) {
      console.log(currentFrame[3]);
      $('.msg:eq(' + bowling.frameIndex + ')').text(currentFrame[1]);
      //$('.msg:eq(' + bowling.frameIndex + ')').show(slow);
    }
   }

  bowling.handleFrameScoreOutput = function(currentFrame, index) {
    if(currentFrame[2] !== null)
      $('.turn-score:eq(' + index + ')').text(currentFrame[2]);
  };

  //overide message handling
  bowling.handleMessages = function(msg) {
    console.log(msg);
    $('.messages').text(msg);
    if (msg === 'game over') {
      $('.messages').text('Game Over! you scored ' + bowling.score + ' points!');
      $('#bowl').text('restart');
      $('#bowl').on('click', function() {
        location.reload();
      })
    }
  }

  $('#bowl').on('click', function() {
    bowling.roll();
  })
};

var start = document.getElementById('start');
var gameCard = document.getElementById('game-card');
var scoreBox = '<li class="score-box">' +
                  '<span class="first-score"></span>' +
                  '<span class="second-score"></span>' +
                  '<span class="turn-score"></span>' +
                  '<span class="msg"></span>' +
                  '</li>';
var scoreBoxLast = '<li class="score-box">' +
               '<span class="first-score"></span>' +
               '<span class="second-score"></span>' +
               '<span class="third-score"></span>' +
               '<span class="turn-score"></span>' +
               '<span class="msg"></span>' +
               '</li>';

//var scoreBox = document.getElementsByClassName('score-box')[0];
gameCard.parentNode.removeChild(gameCard);
start.addEventListener('click', function() {
  startGame();
});
