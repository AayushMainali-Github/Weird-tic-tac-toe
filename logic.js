//some info for game
board = [
  ["X", "O", "X", "O"],
  ["", "", "", ""],
  ["", "", "", ""],
  ["O", "X", "O", "X"],
];
var turn = "X";
var p = "O";
var ai = "X";
document.getElementById("result").innerText = `${turn}'s Turn`;
//take move
moveEQ = {
  1: [0, 0],
  2: [0, 1],
  3: [0, 2],
  4: [0, 3],
  5: [1, 0],
  6: [1, 1],
  7: [1, 2],
  8: [1, 3],
  9: [2, 0],
  10: [2, 1],
  11: [2, 2],
  12: [2, 3],
  13: [3, 0],
  14: [3, 1],
  15: [3, 2],
  16: [3, 3],
};

//check Result
checkResult = (b) => {
  //horizontals
  if (b[0][0] == b[0][1] && b[0][1] == b[0][2] && b[0][2] == b[0][3] && b[0][0] != "") return `${b[0][0]} Won`;
  if (b[1][0] == b[1][1] && b[1][1] == b[1][2] && b[1][2] == b[1][3] && b[1][0] != "") return `${b[1][0]} Won`;
  if (b[2][0] == b[2][1] && b[2][1] == b[2][2] && b[2][2] == b[2][3] && b[2][0] != "") return `${b[2][0]} Won`;
  if (b[3][0] == b[3][1] && b[3][1] == b[3][2] && b[3][2] == b[3][3] && b[3][0] != "") return `${b[3][0]} Won`;
  //verticals
  else if (b[0][0] == b[1][0] && b[1][0] == b[2][0] && b[2][0] == b[3][0] && b[2][0] != "") return `${b[1][0]} Won`;
  else if (b[0][1] == b[1][1] && b[1][1] == b[2][1] && b[2][1] == b[3][1] && b[2][1] != "") return `${b[1][1]} Won`;
  else if (b[0][2] == b[1][2] && b[1][2] == b[2][2] && b[2][2] == b[3][2] && b[2][2] != "") return `${b[1][2]} Won`;
  else if (b[0][3] == b[1][3] && b[1][3] == b[2][3] && b[2][3] == b[3][3] && b[2][3] != "") return `${b[1][3]} Won`;
  //diagonals
  else if (b[0][0] == b[1][1] && b[1][1] == b[2][2] && b[2][2] == b[3][3] && b[0][0] != "") return `${b[1][1]} Won`;
  else if (b[0][3] == b[1][2] && b[1][2] == b[2][1] && b[2][1] == b[3][0] && b[0][3] != "") return `${b[0][3]} Won`;
  //incomplete
  else return null;
};

aMove = async () => {
  // AI to make its turn

  let bestScore = -Infinity;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == ai) {
        let posMVS = possMov([i, j]);
        if (posMVS.length != 0) {
          for (k = 0; k < posMVS.length; k++) {
            board[posMVS[k][0]][posMVS[k][1]] = ai;
            board[i][j] = "";
            let score = await minimax(board, 0, false);
            board[i][j] = ai;
            board[posMVS[k][0]][posMVS[k][1]] = "";
            if (score >= bestScore) {
              bestScore = score;
              move = [[i, j], posMVS[k]];
            }
          }
        }
      }
    }
  }
  ranMov = rMove();
  board[ranMov[1][0]][ranMov[1][1]] = ai;
  board[ranMov[0][0]][ranMov[0][1]] = "";
  let scor = await minimax(board, 0, false);
  board[ranMov[1][0]][ranMov[1][1]] = "";
  board[ranMov[0][0]][ranMov[0][1]] = ai;
  if (scor == bestScore) return ranMov;
  return move;
};
let scores = {
  "X Won": 10,
  "O Won": -10,
  null: 0,
};
async function minimax(board, depth, isMaximizing) {
  let result = checkResult(board);
  if (depth == 6 || result != null) {
    return scores[result] - depth;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i2 = 0; i2 < 4; i2++) {
      for (let j2 = 0; j2 < 4; j2++) {
        if (board[i2][j2] == ai) {
          let posMVS = possMov([i2, j2]);
          let pscm = posMVS;
          if (posMVS.length != 0) {
            for (let k2 = 0; k2 < posMVS.length; k2++) {
              board[pscm[k2][0]][pscm[k2][1]] = ai;
              board[i2][j2] = "";
              let score = await minimax(board, depth + 1, false);
              board[i2][j2] = ai;
              board[pscm[k2][0]][pscm[k2][1]] = "";
              bestScore = Math.max(score, bestScore);
            }
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i1 = 0; i1 < 4; i1++) {
      for (let j1 = 0; j1 < 4; j1++) {
        if (board[i1][j1] == p) {
          let posMVS = possMov([i1, j1]);
          let pscm = posMVS;
          if (posMVS.length != 0) {
            for (let k1 = 0; k1 < posMVS.length; k1++) {
              board[pscm[k1][0]][pscm[k1][1]] = p;
              board[i1][j1] = "";
              let score = await minimax(board, depth + 1, true);
              board[i1][j1] = p;
              board[pscm[k1][0]][pscm[k1][1]] = "";
              bestScore = Math.min(score, bestScore);
            }
          }
        }
      }
    }

    return bestScore;
  }
}

//possible moves
possMov = (ps) => {
  mvs = [];
  //up
  if (board[ps[0] - 1] && board[ps[0] - 1][ps[1]] == "") mvs.push([ps[0] - 1, ps[1]]);
  //down
  if (board[ps[0] + 1] && board[ps[0] + 1][ps[1]] == "") mvs.push([ps[0] + 1, ps[1]]);
  //right

  if (board[ps[0]][ps[1] + 1] == "") mvs.push([ps[0], ps[1] + 1]);
  //left
  if (board[ps[0]][ps[1] - 1] == "") mvs.push([ps[0], ps[1] - 1]);
  return mvs;
};

//randomMove
rMove = () => {
  i = Math.floor(Math.random() * 4);
  j = Math.floor(Math.random() * 4);
  if (board[i][j] != turn) return rMove();
  let posMVS = possMov([i, j]);
  if (posMVS.length == 0) return rMove();
  let k = Math.floor(Math.random() * posMVS.length);
  return [[i, j], posMVS[k]];
};

//actual game
playMove = async (b, mv) => {
  var move;

  if (turn != p) move = await aMove();
  else move = mv;
  console.log(move);
  await remove(move[0]);
  await draw(move[1], turn);
  board[move[1][0]][move[1][1]] = turn;
  board[move[0][0]][move[0][1]] = "";
  rslt = checkResult(b);
  if (rslt != null) {
    return (document.getElementById("result").innerText = rslt);
  }
  if (turn == "X") turn = "O";
  else turn = "X";
  document.getElementById("result").innerText = `${turn}'s Turn`;
  if (turn == ai)
    setTimeout(() => {
      playMove(b);
    }, 1000);
  removeCircles();
};
