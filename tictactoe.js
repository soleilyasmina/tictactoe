
const prompt = require('readline-sync');
const chalk = require('chalk');

const gameState = {
  board: [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9']
  ],
  p1Wins: 0,
  p2Wins: 0,
  won: false,
  winner: null,
  player: 'X',
  initGame() {
    this.board = [
      ['1','2','3'],
      ['4','5','6'],
      ['7','8','9']
    ];
    this.winner = null;
    this.won = false;
    this.player = 'X';
  }
}

const displayBoard = () => {
  let i = 0;
  while (i < 3) {
    console.log(chalk.black.bgWhite(gameState.board[i]));
    i += 1;
  }
}

const checkWin = board => {
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return true;
  }
  else if (board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
    return true;
  }
  else {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return true;
      }
      else if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        return true;
      }
      else { };
  }
    return false;
  }
}

const markSpot = () => {
  let spot = promptInput();
  while (isValidSpot(spot) === false) {
    displayBoard();
    spot = promptInput();
  }
  spot = Number(spot);
  switch(spot) {
    case 1:
      gameState.board[0][0] = gameState.player;
      break;
    case 2:
      gameState.board[0][1] = gameState.player;
      break;
    case 3:
      gameState.board[0][2] = gameState.player;
      break;
    case 4:
      gameState.board[1][0] = gameState.player;
      break;
    case 5:
      gameState.board[1][1] = gameState.player;
      break;
    case 6:
      gameState.board[1][2] = gameState.player;
      break;
    case 7:
      gameState.board[2][0] = gameState.player;
      break;
    case 8:
      gameState.board[2][1] = gameState.player;
      break;
    case 9:
      gameState.board[2][2] = gameState.player;
      break;
  }
}

const isValidSpot = spot => {
  spot = Number(spot);
  switch(spot) {
    case 1:
      if (gameState.board[0][0].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    case 2:
      if (gameState.board[0][1].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    case 3:
      if (gameState.board[0][2].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    case 4:
      if (gameState.board[1][0].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    case 5:
      if (gameState.board[1][1].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    case 6:
      if (gameState.board[1][2].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    case 7:
      if (gameState.board[2][0].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    case 8:
      if (gameState.board[2][1].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    case 9:
      if (gameState.board[2][2].match(/[1-9]/) != null) { return true; }
      else { console.log('This spot has been taken.'); return false; }
    default:
      console.log('This is invalid input. Please choose another spot.');
      return false;
  }
}

const promptInput = () => prompt.question('Choose a spot, 1-9.\n');

const switchPlayer = () => {
  if (gameState.player === 'X') {
    gameState.player = 'O';
  }
  else {
    gameState.player = 'X';
  }
}
const isFull = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameState.board[i][j].match(/[1-9]/)) {
        return false;
      }
    }
  }
  return true;
}

const winLog = () => {
  if (isFull()) {
    console.log(`It's a tie!`);
  }
  else {
    console.log(`Congrats ${gameState.winner}!`);
  }
  console.log(`X has won ${gameState.p1Wins}, and O has won ${gameState.p2Wins}.`);
}

const addPoints = () => {
  gameState.winner === 'X' ?
  gameState.p1Wins += 1:
  gameState.p2Wins += 1;
}
const playAgain = () => {
  let answer = prompt.question('Would you like to play again? Type [y/n].\n');
  answer === 'y' ? playGame(): console.log('Thanks for playing!');
}

const playGame = () => {
  gameState.initGame();
  displayBoard();
  while (gameState.won === false && isFull() === false) {
      markSpot(gameState.player);
      displayBoard();
      if (checkWin(gameState.board) === true) {
        gameState.winner = gameState.player;
        addPoints();
        gameState.won = true;
      }
      switchPlayer();
  }
  winLog();
  playAgain();
}

playGame();
