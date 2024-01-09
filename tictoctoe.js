const X_CLASS = 'x'             //declare players and elements need for the game
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [  //possible winning combination 
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()  // startgame method to actually start the game

restartButton.addEventListener('click', startGame) //addEventLinstener method,restart the game with click restart button

function startGame() {
  circleTurn = false                // game start from x player
  cellElements.forEach(cell => {    //fotEach method 
    cell.classList.remove(X_CLASS)  //after the game end, clear the grid for both X n O
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true }) //X or O can click each cell one time
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show') //remove the show class after the restart button
}

function handleClick(e) {       //descrive what you can do with click in the game
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {        //if else statement to check for win or draw and to take turns
    endGame(false)                     
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {        //after the game end, show the winning message with if else
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
  }
  winningMessageElement.classList.add('show') //show us winning message
}

function isDraw() {     //every cells were filled with X or O, then return to draw except winning patterns
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {    //X or O can be shown in the cell with each click
  cell.classList.add(currentClass)
}

function swapTurns() {      // X and O are shown swapping each time
  circleTurn = !circleTurn 
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {                     //Hover X or O in the cell
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {           //check winner with winning combination
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}