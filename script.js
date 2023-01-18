const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  activePlayer = 1;
  playerOne = {
    score: 0,
    name: "Player 1",
  };
  playerTwo = {
    score: 0,
    name: "Player 2",
  };
  round = true;

  document.querySelector(".start").addEventListener("click", function () {
    board = ["", "", "", "", "", "", "", "", ""];
    activePlayer = 1;
    round = true;
    for (let i = 0; i < 9; i++) {
      const div = document.querySelector(`div[data="${i}"`);
      div.innerHTML = board[i];
      div.addEventListener("click", function () {
        if (div.innerHTML === "") {
          playerMaker(i);
        }
      });
    }
    document.querySelector(".win").remove();
  });

  document.querySelector(".restart").addEventListener("click", function () {
    board = ["", "", "", "", "", "", "", "", ""];
    activePlayer = 1;
    playerOne.score = 0;
    playerTwo.score = 0;
    updateDisplay();
    round = true;
    for (let i = 0; i < 9; i++) {
      const div = document.querySelector(`div[data="${i}"`);
      div.innerHTML = board[i];
      div.addEventListener("click", function () {
        if (div.innerHTML === "") {
          playerMaker(i);
        }
      });
    }
    document.querySelector(".win").remove();
  });

  document.querySelector(".change-1").addEventListener("click", function () {
    divExist = document.querySelector(".change");
    if (divExist === null) {
      div = document.createElement("div");
      button = document.createElement("button");
      textArea = document.createElement("textarea");

      div.classList.add("change");
      button.innerHTML = "Change Name";
      button.addEventListener("click", function () {
        if (textArea.value !== "") {
          playerName = textArea.value;
          document.querySelector(".player-1").innerHTML = playerName;
          playerOne.name = playerName;
          div.remove();
        }
      });

      document.body.appendChild(div);
      div.appendChild(textArea);
      div.appendChild(button);
    }
  });

  document.querySelector(".change-2").addEventListener("click", function () {
    divExist = document.querySelector(".change");
    if (divExist === null) {
      div = document.createElement("div");
      button = document.createElement("button");
      textArea = document.createElement("textarea");

      div.classList.add("change");
      button.innerHTML = "Change Name";
      button.addEventListener("click", function () {
        if (textArea.value !== "") {
          playerName = textArea.value;
          document.querySelector(".player-2").innerHTML = playerName;
          playerOne.name = playerName;
          div.remove();
        }
      });

      document.body.appendChild(div);
      div.appendChild(textArea);
      div.appendChild(button);
    }
  });

  const checkResult = function () {
    function horizontal() {
      if (
        (board[0] !== "" && board[1] !== "" && board[2] !== "") ||
        (board[3] !== "" && board[4] !== "" && board[5] !== "") ||
        (board[6] !== "" && board[7] !== "" && board[8] !== "")
      ) {
        if (board[0] === board[1] && board[1] === board[2]) {
          return board[0];
        } else if (board[3] === board[4] && board[4] === board[5]) {
          return board[3];
        } else if (board[6] === board[7] && board[7] === board[8]) {
          return board[6];
        } else {
          return "false";
        }
      } else return "false";
    }

    function vertical() {
      if (
        (board[0] !== "" && board[3] !== "" && board[6] !== "") ||
        (board[1] !== "" && board[4] !== "" && board[7] !== "") ||
        (board[2] !== "" && board[5] !== "" && board[8] !== "")
      ) {
        if (board[0] === board[3] && board[0] === board[6]) {
          return board[0];
        } else if (board[1] === board[4] && board[1] === board[7]) {
          return board[1];
        } else if (board[2] === board[5] && board[5] === board[8]) {
          return board[2];
        } else {
          return "false";
        }
      } else return "false";
    }

    function diagonal() {
      if (
        (board[0] !== "" && board[4] !== "" && board[8] !== "") ||
        (board[2] !== "" && board[4] !== "" && board[6] !== "")
      ) {
        if (board[0] === board[4] && board[0] === board[8]) {
          return board[0];
        } else if (board[2] === board[4] && board[2] === board[6]) {
          return board[2];
        } else {
          return "false";
        }
      } else return "false";
    }

    function tie() {
      let result = 0;
      for (let i = 0; i < 9; i++) {
        const div = document.querySelector(`div[data="${i}"`);
        if (div.innerHTML === "") {
          result++;
        }
      }
      return result;
    }

    if (horizontal() === "X" || horizontal() === "0") {
      return horizontal();
    } else if (vertical() === "X" || vertical() === "0") {
      return vertical();
    } else if (diagonal() === "X" || diagonal() === "0") {
      return diagonal();
    } else if (tie() === 0) {
      return "Draw";
    } else return;
  };

  const playerMaker = function (i) {
    const div = document.querySelector(`div[data="${i}"`);
    if (round === true) {
      if (activePlayer === 1) {
        board[i] = "0";
        div.innerHTML = board[i];
        activePlayer = 2;
        result = checkResult();
        if (result === "X" || result == "0") {
          round = false;
          endGame(result);
        } else if (result === "Draw") {
          round = false;
          endGame(result);
        }
      } else {
        board[i] = "X";
        div.innerHTML = board[i];
        activePlayer = 1;
        result = checkResult();
        if (result === "X" || result == "0") {
          round = false;
          endGame(result);
        } else if (result === "Draw") {
          round = false;
          endGame(result);
        }
      }
    }
  };

  for (let i = 0; i < 9; i++) {
    const div = document.querySelector(`div[data="${i}"`);
    div.innerHTML = board[i];
    div.addEventListener("click", function () {
      if (div.innerHTML === "") {
        playerMaker(i);
      }
    });
  }

  const endGame = function (result) {
    if (result === "X") {
      winAnnounce("Two");
      playerTwo.score++;
      updateDisplay();
    } else if (result === "0") {
      winAnnounce("One");
      playerOne.score++;
      updateDisplay();
    } else if (result === "Draw") {
      console.log("Draw");
      winAnnounce("Draw");
    }
  };

  const updateDisplay = function () {
    document.querySelector(".player-1-score").innerHTML = playerOne.score;
    document.querySelector(".player-2-score").innerHTML = playerTwo.score;
  };

  const winAnnounce = function (who) {
    div = document.createElement("div");
    h2 = document.createElement("h2");

    div.classList.add("win");
    if (who === "One") {
      h2.innerHTML = `${playerOne.name} won! 🎉`;
    } else if (who === "Two") {
      h2.innerHTML = `${playerTwo.name} won! 🎉`;
    } else {
      h2.innerHTML = `Draw(`;
      h2.style.color = "black";
    }

    document.body.appendChild(div);
    div.appendChild(h2);
  };
})();

// const game = (() => {
//   for(let i = 0; i < 9; i++){
//     document.querySelector(`div[data="${i}"`).addEventListener('click', function(){
//       console.log(this);
//     })
//   }

// })();
