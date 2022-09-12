let boardArray = ["", "", "", "", "", "", "", "", ""];
const grid = document.querySelector("#grid");

const game = (() => {
  let currentSymbol = "o";
  let round = 0;
  const renderBoard = () => {
    for (i = 0; i < boardArray.length; i++) {
      const div = document.createElement("div");
      div.classList.add("symbol");
      div.dataset.index = i;
      div.innerText = boardArray[i];
      grid.appendChild(div);
    }
  };

  const addListeners = () => {
    const markBtn = document.querySelectorAll(".symbol");

    markBtn.forEach((e) => e.addEventListener("click", playRound));
  };

  const playRound = (e) => {
    let index = e.target.getAttribute("data-index");

    if (validate(index)) {
      boardArray[index] = currentSymbol;
      changeSymbol();
      clearBoard();
      renderBoard();
      addListeners();
      round++;
      gameOver();
    } else {
      console.log("wrong position");
    }
  };

  const changeSymbol = () => {
    if (currentSymbol == "o") {
      currentSymbol = "x";
    } else {
      currentSymbol = "o";
    }
  };
  const clearBoard = () => {
    grid.innerHTML = "";
  };
  const validate = (index) => (boardArray[index] == "" ? true : false);

  const gameOver = () => {
    if (winningCondition()) {
      changeSymbol();
      console.log(currentSymbol + " is a winner");
    }
    if (round == 9) {
      console.log("Tie");
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
    renderBoard,
    addListeners,
  };
})();

game.renderBoard();
game.addListeners();
