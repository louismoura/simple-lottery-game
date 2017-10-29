'use strict';

var newPlayerForm = document.querySelector('.new-player-form');
var playerWindow = document.querySelector('.player-window');
var playerNameHTML = document.querySelector('.player-name-text');
var playerCreditsHTML = document.querySelector('.player-credits');
var continueGameBtn = document.querySelector('.close-welcome');
var gamer = void 0;

function Player(name) {
  this.name = name;
  this.credits = 10;
}

function newGame(e) {
  var newPlayer = document.querySelector('.new-player-input');
  var playerName = newPlayer.value || 'Player';
  gamer = new Player(playerName);

  //ADD PLAYER TO LOCAL SOTRAGE
  setLocalStorage(gamer);

  e.preventDefault();
  document.body.classList.add('showGame-start');
  setTimeout(function () {
    document.body.classList.add('showGame');
  }, 10);

  playerNameHTML.innerHTML = 'Player name: ' + gamer.name;
  playerCreditsHTML.innerHTML = 'Credits: ' + gamer.credits + ' $';
}

function setLocalStorage(localGamer) {
  var gamerJSON = JSON.stringify(localGamer);
  localStorage.setItem("player", gamerJSON);
}

function continueGame(e) {
  e.preventDefault();

  var localPlayerInfo = JSON.parse(localStorage.getItem('player'));

  gamer = new Player(localPlayerInfo.name);
  gamer.credits = localPlayerInfo.credits;

  document.body.classList.add('showGame-start');
  setTimeout(function () {
    document.body.classList.add('showGame');
  }, 10);

  playerNameHTML.innerHTML = 'Player name: ' + gamer.name;
  playerCreditsHTML.innerHTML = 'Credits: ' + gamer.credits + ' $';
}

window.onload = function () {
  var welcomeName = document.querySelector('.welcome-name');
  var localPlayerInfo = JSON.parse(localStorage.getItem('player'));

  if (!!localPlayerInfo) {
    playerWindow.classList.add('back-start');
    setTimeout(function () {
      playerWindow.classList.add('back');
    }, 10);
    welcomeName.innerHTML = localPlayerInfo.name;
  } else {
    playerWindow.classList.add('new-start');
    setTimeout(function () {
      playerWindow.classList.add('new');
    }, 10);
  }
};

newPlayerForm.addEventListener('submit', newGame);
continueGameBtn.addEventListener('click', continueGame);

var numbersContainer = document.querySelector('.numbersContainer');
var drawBtn = document.querySelector('.play-btn');
var lotterNumbersContainer = document.querySelector('.lottery-numbers');
var numbers = '';
var numbersPool = [];

//ADDING NUMBERS TO PAGE
for (var i = 1; i <= 35; i++) {
  var number = '<span class="number" data-num="' + i + '">' + i + '</span>';
  numbers += number;
  //ADDING NUMBERS TO POOL
  numbersPool.push(i);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function draw() {
  //PRICE OF GAME
  var gameResultText = document.querySelector('.game-results');
  var numberChosen = numbersContainer.querySelectorAll('.active');
  var numberChosenArray = [];
  var reward = 0;

  //AD CHOSEN NUMERS TO ARRAY

  numberChosen.forEach(function (number) {
    return numberChosenArray.push(+number.dataset.num);
  });

  if (numberChosenArray.length < 6) {
    gameAlert('You have to select 6 numbers!');
    return;
  };

  //CALL GAME ALERT TO CLOS ALERTS

  gameAlert();

  //- 1 CREDIT GAME COST

  gamer.credits -= 1;

  var numbersDrawn = [];

  for (var _i = 0; _i < 6; _i++) {
    var _number = getRandomNumber(1, 35);
    if (numbersDrawn.length === 0) {
      numbersDrawn.push(_number);
    } else {
      if (numbersDrawn.includes(_number)) {
        _i--;
      } else {
        numbersDrawn.push(_number);
      }
    }
  }

  lotterNumbersContainer.innerHTML = numbersDrawn.map(function (number) {
    return '<span class=\'number\'>' + number + '</span>';
  }).join('');

  var numbersMatched = [];

  for (var _i2 = 0; _i2 < numbersDrawn.length; _i2++) {
    if (numberChosenArray.includes(numbersDrawn[_i2])) {
      numbersMatched.push(numbersDrawn[_i2]);
    };
  }

  if (numbersMatched.length === 1) {
    reward = 1;
  } else if (numbersMatched.length === 2) {
    reward = 4;
  } else if (numbersMatched.length === 3) {
    reward = 8;
  } else if (numbersMatched.length === 4) {
    reward = 20;
  } else if (numbersMatched.length === 5) {
    reward = 100;
  } else if (numbersMatched.length === 6) {
    reward = 1000000;
  }

  //PRTIN REWARD

  if (numbersMatched.length === 0) {
    gameResultText.innerHTML = 'You lost. Play again.';
  } else if (numbersMatched.length === 1) {
    gameResultText.innerHTML = 'You got ' + numbersMatched.length + ' number ' + numbersMatched.join(', ') + '.<br> You won ' + reward + ' $.';
  } else {
    gameResultText.innerHTML = 'You got ' + numbersMatched.length + ' numbers ' + numbersMatched.join(', ') + '.<br> You won ' + reward + ' $.';
  }

  gamer.credits += reward;

  //UPDATE GAMER IN LOCAL STORAGE

  setLocalStorage(gamer);

  playerCreditsHTML.innerHTML = 'Credits: ' + gamer.credits + ' $';
}

function choseNum() {
  var _this = this;

  var numbersActive = numbersContainer.querySelectorAll('.active');

  if (event.target.classList.contains('active')) {

    event.target.classList.remove('active');
    event.target.classList.remove('active-start');
    gameAlert();
  } else {

    if (numbersActive.length >= 6) {
      gameAlert('You have already selected 6 numbers!');
      return;
    }if (numbersActive.length == 5) {
      gameAlert();
    }
    this.classList.add('active');
    setTimeout(function () {
      _this.classList.add('active-start');
    }, 10);
  }
}

function gameAlert(text) {
  var gameAlertText = document.querySelector('.game-alert');

  if (!!text) {
    gameAlertText.style.display = 'block';
    gameAlertText.innerHTML = text;
  } else {
    gameAlertText.style.display = 'none';
  }
}

numbersContainer.innerHTML = numbers;
var printedNumbers = numbersContainer.querySelectorAll('*');

printedNumbers.forEach(function (number) {
  return number.addEventListener('click', choseNum);
});
drawBtn.addEventListener('click', draw);
//# sourceMappingURL=main-es5.js.map
