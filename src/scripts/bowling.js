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
    var pins = Math.floor(Math.random() * this.framePins + 1);
    if (this.frames.length === 10 && this.frames[9][3] === null) {
      this.handleMessages('game over');
      return;
    } else if (this.frames.length === 10 && this.frames[9][3] !== null) {
      this.handleMessages('you bowled a ' + pins);
      this.ball = 2;
      this.playFrame(pins);
      return pins
    } else {
      this.handleMessages('you bowled a ' + pins);
      this.playFrame(pins);
      return pins;
    }
  };

  //begin each frame
  Game.prototype.setPins = function() {
    this.framePins = 10;
    this.ball = 1;
    this.currentFrame = [null, null, null, null];
    this.handleNewFrame();
  };

  //play through frames
  Game.prototype.playFrame = function(pins) {

    var that = this;

    function nextFrame() {
      that.frames.push(that.currentFrame);
      that.handleFrameScore();
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
  Game.prototype.handleFrameScoreOutput = function(currentFrame, index) {

  };

  //handles scores for each frame
  Game.prototype.handleFrameScore = function() {
    this.score = 0;
    if (this.currentFrame[3] === null) {
      this.currentFrame[2] = this.currentFrame[1] + this.currentFrame[0];
      this.handleFrameScoreOutput(this.currentFrame, this.frameIndex);
    }
    //loop evey time there goes to next frame
    for (var i = this.frames.length - 1; i > 0; i--) {
      if (this.frames[i-1] !== undefined && this.frames[i-1][3] === 'spare') {
        this.frames[i-1][2] = this.frames[i][2] + 10;
        this.handleFrameScoreOutput(this.frames[i - 1], i - 1)
      }
      if (this.frames[i-2] !== undefined && this.frames[i-2][3] === 'strike') {
          if (this.frames[i-1][3] === null) {
            this.frames[i-2][2] = this.frames[i][2] + this.frames[i-1][2] + 10;
          } else {
            this.frames[i-2][2] = this.frames[i][2] + 20;
          }
          this.handleFrameScoreOutput(this.frames[i-2], i - 2);
      }
      this.score += this.frames[i][2];
    }
  };

  Game.prototype.handleNewFrame = function() {
  };

  return Game;
})();

module.exports = Game;
