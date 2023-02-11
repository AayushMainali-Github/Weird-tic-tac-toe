cnvx = c.getBoundingClientRect();
window.addEventListener("resize", (ev) => {
  cnvx = c.getBoundingClientRect();
});
circles = [];
clickedPC = null;

removeCircles = () => {
  circles.forEach((elm) => {
    remove(elm);
  });
  circles = [];
  clickedPC = null;
};

c.addEventListener("click", (ev) => {
  x = Math.floor((ev.x - cnvx.x) / (size / 4));
  y = Math.floor((ev.y - cnvx.y) / (size / 4));
  circles.forEach((elm) => {
    if (elm[0] == y && elm[1] == x) {
      board[y][x] = turn;
      board[clickedPC[0]][clickedPC[1]] = "";
      playMove(board, [clickedPC, elm]);
      removeCircles();
    }
  });
  if (board[y][x] == p && p == turn) {
    removeCircles();
    posmoves = possMov([y, x]);
    posmoves.forEach((elm) => {
      circles.push(elm);
      clickedPC = [y, x];
      drawSmallCircle(elm);
    });
  }
});
