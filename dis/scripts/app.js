//bowling
var Game = (function() {
  //constructor
  function Game() {
    this._bar = 'new game';
  };

})();

var startGame = function() {
  //var content = document.getElementsByClassName('content')[0];
  var startCard = document.getElementById('start-card');
  startCard.parentNode.removeChild(startCard);
  alert('bowl!');
};


var start = document.getElementById('start');
start.addEventListener('click', function() {
  startGame();
});
