/**
  * @author Soleil Solomon <mounlasolomon@gmail.com>
  * @since 2018-10-12
  */
const prompt = require('readline-sync');
const chalk = require('chalk');

// creating the game state

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

/**
  * @func displayBoard
  * @desc displays the board by iterating through each row,
  * adding spaces in between, and logging the concatenated
  * row to the console
  * @returns {undefined}
  */
const displayBoard = () => {
  let i = 0;
  while (i < 3) {
    let row = '';
    let j = 0;
    while (j < 3) {
      row += gameState.board[i][j] + ' ';
      j += 1;
    }
    console.log(chalk.black.bgWhite(row.trim()));
    i += 1;
  }
}

/**
  * @func markSpot
  * @desc marks a given spot defined by the player
  * if it is an empty space
  * @returns {undefined}
  */
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

/**
  * @func isValidSpot
  * @desc receives a potential spot, checks if a given spot is free
  * for marking, and returns true if it is available, false otherwise
  * or with invalid input
  * @param {String} spot
  * @returns {Boolean}
  */
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

/**
  * @func promptInput
  * @desc prompts user for input using 'readline-sync' package
  * @returns {undefined}
  */
const promptInput = () => prompt.question('Choose a spot, 1-9.\n');

/**
  * @func switchPlayer
  * @desc switches current player
  * @returns {undefined}
  */
const switchPlayer = () => {
  if (gameState.player === 'X') {
    gameState.player = 'O';
  }
  else {
    gameState.player = 'X';
  }
}

/**
  * @func checkWin
  * @desc checks all possible winning combinations (8)
  * @param {Array.Array.<String>} board
  * @returns {Boolean}
  */
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

/**
  * @func isFull
  * @desc checks all possible spots for space for game condition
  * @returns {Boolean}
  */
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

/**
  * @func winLog
  * @desc logs winner or tie, and current points for both players
  * @returns {undefined}
  */
const winLog = () => {
  if (gameState.winner === null) {
    console.log(`It's a tie!`);
  }
  else {
    addPoints();
    console.log(`Congrats ${gameState.winner}!`);
  }
  console.log(`X has won ${gameState.p1Wins}, and O has won ${gameState.p2Wins}.`);
}

/**
  * @func addPoints
  * @desc add points depending on winner
  * @returns {undefined}
  */
const addPoints = () => {
  gameState.winner === 'X' ?
  gameState.p1Wins += 1:
  gameState.p2Wins += 1;
}

/**
  * @func playAgain
  * @desc asks the player if they would like to play playAgain
  * if it's true, runs playGame()
  * @returns {undefined}
  */
const playAgain = () => {
  let answer = prompt.question('Would you like to play again? Type [y/n].\n');
  answer === 'y' ? playGame(): console.log('Thanks for playing!');
}

/**
  * @func playGame
  * @desc Game order works as follows
  * 1) Initializes new board, and resets winner.
  * 2) Displays the board.
  * 3) While the game can/hasn't been won, repeats steps 4-7.
  * 4) Asks the player to mark a spot.
  * 5) Displays the board.
  * 6) Checks if the player has won.
  * 7) Switches players.
  * If the game has been won at step 6,
  * 8) Sets the game winner.
  * 9) Adds points to the relevant player.
  * 10) Logs the winner and points to the console.
  * 11) Asks the player if they want to play again.
  * @returns {undefined}
  */
const playGame = () => {
  gameState.initGame();
  displayBoard();
  while (gameState.won === false) {
      console.log(`${gameState.player}, it's your turn.`);
      markSpot(gameState.player);
      displayBoard();
      if (checkWin(gameState.board) === true) {
        gameState.winner = gameState.player;
        gameState.won = true;
      }
      if (isFull() === true) { break };
      switchPlayer();
  }
  winLog();
  playAgain();
}

playGame();
