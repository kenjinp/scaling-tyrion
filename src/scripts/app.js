//bowling
'use strict';

//require jquery for browserify
global.jQuery = global.$ = require('jquery');
//load up our game module
var Game = require('./bowling');

var startGame = function() {
  $('.content').children().remove();
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

  //after each change of frame
  bowling.handleNewFrame = function() {
    $('.score-box').each(function() {
      $(this).removeClass('active');
    });
    if (bowling.frameIndex < 10) {
      $('.score-box:eq(' + [bowling.frameIndex] + ')').addClass('active');
    } else {
      $('.score-box:eq(9)').addClass('active');
    }
  };

  //overide score showing for each ball's score
  bowling.handleScores = function(currentFrame) {
    if (currentFrame[0] !== null) {
      $('.first-score:eq(' + bowling.frameIndex + ')').text(currentFrame[0]);
    } if(currentFrame[1] !== null) {
      $('.second-score:eq(' + bowling.frameIndex + ')').text(currentFrame[1]);
    } if(currentFrame[3] !== null) {
      $('.msg:eq(' + bowling.frameIndex + ')').text(currentFrame[1]);
      //$('.msg:eq(' + bowling.frameIndex + ')').show(slow);
    }
  };

  //when a frame's total has been calculated, ouput it to the visualization
  bowling.handleFrameScoreOutput = function(currentFrame, index) {
    if(currentFrame[2] !== null)
      $('.turn-score:eq(' + index + ')').text(currentFrame[2]);
    if (bowling.frames.length > 10) {
      $('.third-score').text(bowling.frames[10][1]);
      $('#bowl').text('finish!');
    }
  };

  //overide message handling
  bowling.handleMessages = function(msg) {
    $('.messages').text(msg);
    if (msg === 'game over') {
      $('.messages').text('Game Over! you scored ' + bowling.score + ' points!');
      $('#bowl').text('restart');
      $('#bowl').on('click', function() {
        location.reload();
      });
    }
  };

  //whenever we click, it will activate
  //the game's input function and progress the game
  $('#bowl').on('click', function() {
    bowling.roll();
  });

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

gameCard.parentNode.removeChild(gameCard);
start.addEventListener('click', function() {
  startGame();
});
