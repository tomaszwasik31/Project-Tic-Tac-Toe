const gameBoard = (() => {
  let boardArray = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  let grid = document.getElementById("grid");
  const renderBoard = () => {
    for (i = 0; i < boardArray.length; i++) {
      let div = document.createElement("div");
      div.classList.add("mark");
      div.innerText = boardArray[i];
      grid.appendChild(div);
    }
  };
  function putMark(symbol, position) {
    boardArray[position] = symbol;
  }

  return {
    renderBoard,
    putMark,
  };
})();
gameBoard.putMark("o", 0);
gameBoard.renderBoard();
