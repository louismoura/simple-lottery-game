const numbersContainer = document.querySelector('.numbersContainer');
const drawBtn = document.querySelector('.play-btn');
const lotterNumbersContainer = document.querySelector('.lottery-numbers');
let numbers = '';
let numbersPool = [];

//ADDING NUMBERS TO PAGE
for(let i = 1; i <= 35; i++){
  const number = `<span class="number" data-num="${i}">${i}</span>`
  numbers += number;
  //ADDING NUMBERS TO POOL
  numbersPool.push(i);
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function draw(){
  //PRICE OF GAME
  const gameResultText = document.querySelector('.game-results');
  const numberChosen = numbersContainer.querySelectorAll('.active');
  const numberChosenArray = [];
  let reward = 0;

  //AD CHOSEN NUMERS TO ARRAY

  numberChosen.forEach( number => numberChosenArray.push(+number.dataset.num));

  if(numberChosenArray.length < 6) {
    gameAlert('You have to select 6 numbers!');
    return;
  };

  //CALL GAME ALERT TO CLOS ALERTS

  gameAlert();

  //- 1 CREDIT GAME COST

  gamer.credits -= 1;

  let numbersDrawn = [];

  for(let i = 0; i < 6; i++){
    const number = getRandomNumber(1, 35);
    if(numbersDrawn.length === 0){
      numbersDrawn.push(number);
    } else {
      if(numbersDrawn.includes(number)){
        i--;
      } else {
        numbersDrawn.push(number);
      }
    }
  }

  lotterNumbersContainer.innerHTML = numbersDrawn.map( number => {
    return `<span class='number'>${number}</span>`;
  }).join('');

  const numbersMatched = [];

  for(let i = 0; i < numbersDrawn.length; i++){
    if(numberChosenArray.includes(numbersDrawn[i])){
      numbersMatched.push(numbersDrawn[i]);
    };
  }

  if(numbersMatched.length === 1){
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

  if(numbersMatched.length === 0){
    gameResultText.innerHTML = 'You lost. Play again.';
  } else if (numbersMatched.length === 1){
    gameResultText.innerHTML = `You got ${numbersMatched.length} number ${numbersMatched.join(', ')}.<br> You won ${reward} $.`;
  } else {
    gameResultText.innerHTML = `You got ${numbersMatched.length} numbers ${numbersMatched.join(', ')}.<br> You won ${reward} $.`;
  }

  gamer.credits += reward;

  //UPDATE GAMER IN LOCAL STORAGE

  setLocalStorage(gamer);

  playerCreditsHTML.innerHTML = `Credits: ${gamer.credits} $`;
}

function choseNum(){

  const numbersActive = numbersContainer.querySelectorAll('.active');

  if(event.target.classList.contains('active')){

    event.target.classList.remove('active');
    event.target.classList.remove('active-start');
    gameAlert();

  } else {

    if(numbersActive.length >= 6) {
      gameAlert('You have already selected 6 numbers!');
      return;
    } if(numbersActive.length == 5) {
      gameAlert();
    }
    this.classList.add('active');
    setTimeout(() => {this.classList.add('active-start'); }, 10);
  }
}

function gameAlert(text){
  const gameAlertText = document.querySelector('.game-alert');

  if(!!text) {
    gameAlertText.style.display = 'block';
    gameAlertText.innerHTML = text;
  } else {
    gameAlertText.style.display = 'none';
  }

}

numbersContainer.innerHTML = numbers;
const printedNumbers = numbersContainer.querySelectorAll('*');

printedNumbers.forEach(number => number.addEventListener('click', choseNum));
drawBtn.addEventListener('click', draw);
