let currentPlayer;
let player1;
let player2;

const playersForm = (() => {
  const startBtn = document.querySelector("#start-btn");
  const formWrapper = document.querySelector("#form-wrapper");
  const player1Input = document.querySelector("[name='player1']");
  const player2Input = document.querySelector("[name='player2']");

  const hideForm = () => {
    formWrapper.classList.add("hidden");
  };

  const getNames = () => {
    player1 = player1Input.value;
    player2 = player2Input.value;
  };

  const startGame = () => {
    getNames();
    hideForm();
    currentPlayer = player1;
    game.render();
  };

  startBtn.addEventListener("click", startGame);
})();

const game = (() => {
  let boardArray = ["", "", "", "", "", "", "", "", ""];
  let round = 0;
  let currentSymbol = "O";

  // cache DOM
  const grid = document.querySelector("#grid");
  const turnDisplay = document.querySelector("#turn-display");
  const gameResult = document.querySelector("#game-result");
  const msgWrapper = document.querySelector("#msg-wrapper");
  const playAgainBtn = document.querySelector("#play-again-btn");
  // bind events

  const bindEvents = () => {
    const markBtn = document.querySelectorAll(".symbol");
    const resetBtn = document.querySelectorAll("#reset-btn");
    playAgainBtn.addEventListener("click", playAgain);
    markBtn.forEach((e) => e.addEventListener("click", playRound));

    resetBtn.forEach((e) => e.addEventListener("click", resetGame));
  };

  const resetGame = () => {
    location.reload();
    return false;
  };

  //render
  const render = () => {
    for (i = 0; i < boardArray.length; i++) {
      const div = document.createElement("div");
      div.classList.add("symbol");
      div.dataset.index = i;
      div.innerText = boardArray[i];
      grid.appendChild(div);

      bindEvents();
      showPlayer();
    }
  };

  const getIndex = (e) => {
    let index = e.target.getAttribute("data-index");
    return index;
  };

  const playRound = (e) => {
    index = getIndex(e);

    if (validate(index)) {
      boardArray[index] = currentSymbol;
      changePlayer();
      clearBoard();
      render();
      round++;
      gameOver();
    } else {
      console.log("wrong position");
    }
  };

  const changePlayer = () => {
    if (currentSymbol == "O") {
      currentPlayer = player2;
      currentSymbol = "X";
    } else {
      currentSymbol = "O";
      currentPlayer = player1;
    }
  };

  const showPlayer = () => {
    turnDisplay.innerText = `${currentPlayer} turn. 
    Click to put your ${currentSymbol} mark`;
  };
  const clearBoard = () => {
    grid.innerHTML = "";
  };
  const validate = (index) => (boardArray[index] == "" ? true : false);

  const showMsg = () => {
    msgWrapper.classList.replace("hidden", "visible");
  };

  const hideMsg = () => {
    msgWrapper.classList.replace("visible", "hidden");
  };
  const playAgain = () => {
    boardArray = ["", "", "", "", "", "", "", "", ""];
    round = 0;
    clearBoard();
    hideMsg();
    render();
  };
  const gameOver = () => {
    if (winningCondition()) {
      changePlayer();
      showMsg();
      gameResult.innerText = `${currentPlayer} is a winner.`;
    }
    if (round == 9) {
      changePlayer();
      showMsg();
      gameResult.innerText = `Game Tie!.`;
    }
  };

  const winningCondition = () => {
    if (
      (boardArray[0] == boardArray[1] &&
        boardArray[0] == boardArray[2] &&
        boardArray[0] != "") ||
      (boardArray[3] == boardArray[4] &&
        boardArray[3] == boardArray[5] &&
        boardArray[3] != "") ||
      (boardArray[6] == boardArray[7] &&
        boardArray[6] == boardArray[8] &&
        boardArray[6] != "") ||
      (boardArray[0] == boardArray[3] &&
        boardArray[0] == boardArray[6] &&
        boardArray[0] != "") ||
      (boardArray[1] == boardArray[4] &&
        boardArray[1] == boardArray[7] &&
        boardArray[1] != "") ||
      (boardArray[2] == boardArray[5] &&
        boardArray[2] == boardArray[8] &&
        boardArray[2] != "") ||
      (boardArray[0] == boardArray[4] &&
        boardArray[0] == boardArray[8] &&
        boardArray[0] != "") ||
      (boardArray[2] == boardArray[4] &&
        boardArray[2] == boardArray[6] &&
        boardArray[2] != "")
    ) {
      return true;
    }
  };

  return {
    render,
  };
})();
