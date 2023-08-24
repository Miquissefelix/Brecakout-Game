const box = document.querySelector(".box");


//declaracao dos valores do css
const boxdWidth = 600;
const boxdHeight = 300;
const blockWidth = 100;
const ballDiameter = 20;


//moveblock
const userStartPosition = [250, 20];
let userCurrentPosition = userStartPosition;


//ball
const ballStartPosition = [290, 40];
let ballCurrentPosition = ballStartPosition;

 let xDirection = 2;
let yDirection = 2;


//declaracao da classe displayblock

class displayBlock {
  constructor(x, y) {
    this.bottomleft = [x, y];
  }
}

const blockLine = [
  //primeira linha
  new displayBlock(10, 270),
  new displayBlock(120, 270),
  new displayBlock(230, 270),
  new displayBlock(340, 270),
  new displayBlock(450, 270),

  //segunda linha
  new displayBlock(10, 240),
  new displayBlock(120, 240),
  new displayBlock(230, 240),
  new displayBlock(340, 240),
  new displayBlock(450, 240),

  //terceira linha
  new displayBlock(10, 210),
  new displayBlock(120, 210),
  new displayBlock(230, 210),
  new displayBlock(340, 210),
  new displayBlock(450, 210),
];


function addblocos() {
  for (let index = 0; index < blockLine.length; index++) {
    const displayBlocks = blockLine[index];

    //adicionamos a criacao da div dentro da function
    const gameblock = document.createElement("div");
    gameblock.classList.add("gameBlock");
    gameblock.style.left = displayBlocks.bottomleft[0] + "px";
    gameblock.style.bottom = displayBlocks.bottomleft[1] + "px";

    box.appendChild(gameblock);
  }
}

addblocos();//function 


//moveblock
const moveblock = document.createElement("div");
moveblock.classList.add("moveblock");
moveblock.style.left = "230px";
moveblock.style.bottom = "4px";
drawUser();
box.appendChild(moveblock);

//ballGame
const ball = document.createElement("div");
ball.classList.add("ballGame");
ball.style.left="230px"
ball.style.bottom="25px"
drawBall();
box.appendChild(ball);


// drawUser-moveuser
function drawUser() {
  moveblock.style.left = userCurrentPosition[0] + "px";
  moveblock.style.bottom = userCurrentPosition[1] + "px";
}

function drawBall() {
  ball.style.left  = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}


//function moveuser
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (userCurrentPosition[0] > 0) {
        userCurrentPosition[0] -= 10;
        drawUser();
      }
      break;
      
    case "ArrowRight":
      if (userCurrentPosition[0] < boxdWidth - blockWidth) {
        userCurrentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);




function moveBall(){
  ballCurrentPosition[0] +=xDirection;
  ballCurrentPosition[1] +=yDirection;
  drawBall();
  checkForCollisions();
}

//move ball 30s
setInterval(moveBall, 30);

function checkForCollisions() {
  if (
    ballCurrentPosition[0] >= boxdWidth - ballDiameter ||
    ballCurrentPosition[1] >= boxdHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[1] <= 0
  ) {
    changeDirection();
  }
}




function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
      yDirection = -2;
      return;
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2;
      return;
    }
  
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2;
      return;
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2;
      return;
    }
}