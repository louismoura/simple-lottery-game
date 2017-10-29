const newPlayerForm = document.querySelector('.new-player-form');
const playerWindow = document.querySelector('.player-window');
const playerNameHTML = document.querySelector('.player-name-text');
const playerCreditsHTML = document.querySelector('.player-credits');
const continueGameBtn = document.querySelector('.close-welcome');
let gamer;

function Player(name){
  this.name = name;
  this.credits = 10;
}

function newGame(e){
  const newPlayer = document.querySelector('.new-player-input');
  const playerName = newPlayer.value || 'Player';
  gamer = new Player(playerName);

  //ADD PLAYER TO LOCAL SOTRAGE
  setLocalStorage(gamer);

  e.preventDefault();
  document.body.classList.add('showGame-start');
  setTimeout(() => {document.body.classList.add('showGame');}, 10);

  playerNameHTML.innerHTML = `Player name: ${gamer.name}`;
  playerCreditsHTML.innerHTML = `Credits: ${gamer.credits} $`;
}

function setLocalStorage(localGamer){
  const gamerJSON = JSON.stringify(localGamer);
  localStorage.setItem("player", gamerJSON);
}

function continueGame(e){
  e.preventDefault();

  const localPlayerInfo = JSON.parse(localStorage.getItem('player'));

  gamer = new Player(localPlayerInfo.name);
  gamer.credits = localPlayerInfo.credits;

  document.body.classList.add('showGame-start');
  setTimeout(() => {document.body.classList.add('showGame');}, 10);

  playerNameHTML.innerHTML = `Player name: ${gamer.name}`;
  playerCreditsHTML.innerHTML = `Credits: ${gamer.credits} $`;
}


window.onload = () => {
  const welcomeName = document.querySelector('.welcome-name');
  const localPlayerInfo = JSON.parse(localStorage.getItem('player'));

  if(!!localPlayerInfo) {
    playerWindow.classList.add('back-start');
    setTimeout( ()=> {playerWindow.classList.add('back');}, 10)
    welcomeName.innerHTML = localPlayerInfo.name;

  } else {
    playerWindow.classList.add('new-start');
    setTimeout( ()=> {playerWindow.classList.add('new');}, 10)
  }
}


newPlayerForm.addEventListener('submit', newGame);
continueGameBtn.addEventListener('click', continueGame);
