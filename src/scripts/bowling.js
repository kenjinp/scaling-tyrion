var Game = (function() {
  'use strict';

  function Game() {
    this.frames = [];
    this.frameIndex = 0;
    this.setPins();
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

  Game.prototype.handleScores = function(currentFrame) {
    return currentFrame;

  };

  Game.prototype.handleNewFrame = function() {

  };

  return Game;
})();

module.exports = Game;
