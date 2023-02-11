var c = document.getElementById("myCanvas");
var size = 200;
c.height = size;
c.width = size;
var ctx = c.getContext("2d");

ctx.fillStyle = "#000000";
ctx.lineWidth = size / 200;
draw = (coords, turn) => {
  if (turn == "X") {
    ctx.beginPath();
    ctx.moveTo(coords[1] * (size / 4) + 10, coords[0] * (size / 4) + 10);
    ctx.lineTo(coords[1] * (size / 4) + (size / 4 - 10), coords[0] * (size / 4) + (size / 4 - 10));
    ctx.moveTo(coords[1] * (size / 4) + (size / 4 - 10), coords[0] * (size / 4) + 10);
    ctx.lineTo(coords[1] * (size / 4) + 10, coords[0] * (size / 4) + (size / 4 - 10));
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(coords[1] * (size / 4) + size / 8, coords[0] * (size / 4) + size / 8, size / 10, 0, 2 * Math.PI);
    ctx.stroke();
  }
};

remove = (coords) => {
  ctx.clearRect(coords[1] * (size / 4) + size / 200, coords[0] * (size / 4) + size / 200, size / 4 - size / 200, size / 4 - size / 200);
};

drawSmallCircle = (coords) => {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.arc(coords[1] * (size / 4) + size / 8, coords[0] * (size / 4) + size / 8, size / 20, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "#000000";
};

drawBoard = () => {
  ctx.fillRect(size / 4, 0, size / 200, size);
  ctx.fillRect(size / 2, 0, size / 200, size);
  ctx.fillRect(size / 2 + size / 4, 0, size / 200, size);
  ctx.fillRect(0, size / 4, size, size / 200);
  ctx.fillRect(0, size / 2, size, size / 200);
  ctx.fillRect(0, size / 2 + size / 4, size, size / 200);
  draw([0, 0], "X");
  draw([0, 1], "O");
  draw([0, 2], "X");
  draw([0, 3], "O");
  draw([3, 0], "O");
  draw([3, 1], "X");
  draw([3, 2], "O");
  draw([3, 3], "X");
};

drawBoard();
setTimeout(async () => {
  playMove(board);
}, 1000);
