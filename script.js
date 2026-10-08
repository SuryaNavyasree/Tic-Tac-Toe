// ---------- State ----------
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

let board;             // array of 9: "X", "O" or null
let turn;              // "X" or "O"
let gameOver;
let vsComputer = true;
let score = { X: 0, O: 0, D: 0 };

// ---------- DOM ----------
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const btnCpu = document.getElementById("btn-cpu");
const btn2p = document.getElementById("btn-2p");

// Create the 9 cells once
const cells = [];
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("button");
  cell.className = "cell";
  cell.setAttribute("aria-label", "Cell " + (i + 1));
  cell.addEventListener("click", () => handleMove(i));
  boardEl.appendChild(cell);
  cells.push(cell);
}

// ---------- Game logic ----------
function getWinner(b) {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return { player: b[a], line: [a, c, d] };
    }
  }
  return null;
}

function checkEnd() {
  const result = getWinner(board);
  if (result) {
    gameOver = true;
    score[result.player]++;
  } else if (board.every(Boolean)) {
    gameOver = true;
    score.D++;
  }
}

function handleMove(i) {
  if (gameOver || board[i]) return;

  board[i] = turn;
  checkEnd();
  turn = turn === "X" ? "O" : "X";
  render();

  // Computer plays as "O" after a short delay
  if (!gameOver && vsComputer && turn === "O") {
    setTimeout(computerTurn, 400);
  }
}

function computerTurn() {
  if (gameOver) return;
  board[bestMove()] = "O";
  checkEnd();
  turn = "X";
  render();
}

// ---------- AI (Minimax: computer never loses) ----------
function minimax(b, player) {
  const result = getWinner(b);
  if (result) return result.player === "O" ? 1 : -1;
  if (b.every(Boolean)) return 0;

  let best = player === "O" ? -2 : 2;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = player;
      const value = minimax(b, player === "O" ? "X" : "O");
      b[i] = null;
      best = player === "O" ? Math.max(best, value) : Math.min(best, value);
    }
  }
  return best;
}

function bestMove() {
  let bestScore = -2;
  let moves = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      const value = minimax(board, "X");
      board[i] = null;
      if (value > bestScore) { bestScore = value; moves = [i]; }
      else if (value === bestScore) moves.push(i);
    }
  }
  return moves[Math.floor(Math.random() * moves.length)];
}

// ---------- Rendering ----------
function render() {
  const result = getWinner(board);

  cells.forEach((cell, i) => {
    cell.textContent = board[i] || "";
    cell.className = "cell" +
      (board[i] ? " " + board[i].toLowerCase() : "") +
      (result && result.line.includes(i) ? " win" : "");
    cell.disabled = gameOver || !!board[i];
  });

  if (result) statusEl.textContent = result.player + " wins!";
  else if (gameOver) statusEl.textContent = "It's a draw.";
  else if (vsComputer && turn === "O") statusEl.textContent = "Computer is thinking...";
  else statusEl.textContent = turn + "'s turn";

  document.getElementById("score-x").textContent = score.X;
  document.getElementById("score-o").textContent = score.O;
  document.getElementById("score-d").textContent = score.D;
}

// ---------- Controls ----------
function newGame() {
  board = Array(9).fill(null);
  turn = "X";
  gameOver = false;
  render();
}

function setMode(computer) {
  vsComputer = computer;
  btnCpu.classList.toggle("active", computer);
  btn2p.classList.toggle("active", !computer);
  score = { X: 0, O: 0, D: 0 };
  newGame();
}

document.getElementById("reset").addEventListener("click", newGame);
btnCpu.addEventListener("click", () => setMode(true));
btn2p.addEventListener("click", () => setMode(false));

newGame();