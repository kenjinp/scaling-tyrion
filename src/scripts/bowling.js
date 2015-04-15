var Game = (function() {
  'use strict';

  function Game() {
    this.frames = [];
    this.frameIndex = 0;
    this.setPins();
    this.score = 0;
  };

  //handle player input
  Game.prototype.roll = function() {

    if (this.frames.length === 10) {
      this.handleMessages('game over');
      return;
    } else {
      var pins = Math.floor(Math.random() * this.framePins + 1);
      this.handleMessages('you bowled a ' + pins);
      this.playFrame(pins);
      return pins;
    }
  };

  //begin each frame
  Game.prototype.setPins = function(pins) {
    this.framePins = 10;
    this.ball = 1;
    this.currentFrame = [null, null, null, null];
    this.handleNewFrame();
  };

  //play through frames
  Game.prototype.playFrame = function(pins) {

    var that = this;

    function nextFrame() {
      if (that.currentFrame[3] === null)
        that.handleFrameScore();
      if (that.currentFrame[3] !== null && that.frames[that.frameIndex - 1] !== null) {
        console.log('defer scoring til next frame');
      }
      that.frames.push(that.currentFrame);
      that.frameIndex += 1;
      that.setPins();
    }

    function evaluateBall(pins) {
      if (that.framePins === 0 && that.ball === 1) {
        that.handleMessages('strike');
        that.currentFrame[3] = 'strike';
        nextFrame();
        return false;
      } if (that.framePins === 0 && that.ball === 2) {
        that.handleMessages('spare');
        that.currentFrame[3] = 'spare';
        return true;
      } if (pins === 0) {
        that.handleMessages('gutterball');
        return true;
      } else {
        return true;
      }
    }

    this.framePins -= pins;


    switch (this.ball) {
      case 1:
        this.currentFrame[this.ball - 1] = pins;
        this.handleScores(this.currentFrame);
        if (evaluateBall(pins) === false) break;
        this.ball += 1;
        break;
      case 2:
        this.currentFrame[this.ball - 1] = pins;
        this.handleScores(this.currentFrame);
        if (evaluateBall(pins) === false) break;
        this.ball += 1;
        nextFrame();
        break;
      default:
        break;
    }
  }

  //handle messages
  Game.prototype.handleMessages = function(message) {
    return msg
  };

  //handles scores for each ball roll
  Game.prototype.handleScores = function(currentFrame) {
    return currentFrame;

  };

  //handles scores for each frame
  Game.prototype.handleFrameScoreOutput = function() {

  };

  //handles scores for each frame
  Game.prototype.handleFrameScore = function() {
    this.currentFrame[2] = this.currentFrame[1] + this.currentFrame[0];
    this.score += this.currentFrame[2];
    this.handleFrameScoreOutput();
  };

  Game.prototype.handleNewFrame = function() {

  };

  return Game;
})();

module.exports = Game;
