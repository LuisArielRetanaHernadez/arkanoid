const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

const ballRadius = 5;

// posicion de la pelota
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;

// velocidad de la pelota
let speedx = 2;
let speedY = -2;

// paleta
const paddleHeight = 10;
const paddleWidth = 75;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

let rightPressed = false;
let leftPressed = false;

// variables ladrillos
const brickRowCount = 5
const brickColumnCount = 12
const brickWidth = 20
const brickHeight = 12
const brickPadding = 2
const brickOffsetTop = 30
const brickOffsetLeft = 30
const bricks = []

const BRICK_STATUS = {
  ACTIVE: 1,
  DESTROYED: 0
}

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    const bricjX = c * (brickWidth + brickPadding) + brickOffsetLeft
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
    bricks[c][r] = { x: bricjX, y: brickY, status: BRICK_STATUS.ACTIVE, color: '#0079FF' }
  }
}

const dramBall = () => {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#F72798';
  ctx.fill();
  ctx.closePath();
}
const dramPaddle = () => {
  ctx.fillStyle = '#0079FF';
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}
const dramBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r]
      if (brick.status === BRICK_STATUS.ACTIVE) {
        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight)
      }
    }
  }
}

const collisionDetection = () => {
  if (ballX + speedx > canvas.width - ballRadius || ballX + speedx < ballRadius) {
    speedx = -speedx;
  } 

  if (ballY + speedY < ballRadius) {
    speedY = -speedY;
  }

  // if (ejeY + speedY > canvas.height - ballRadius) {
  //   document.location.reload();
  // }
 
}
const ballMovement = () => {
  ballX += speedx;
  ballY += speedY;

  const isBallSameXAsPaddle = ballX > paddleX && ballX < paddleX + paddleWidth
  const isBallTouchingPaddle = ballY + speedY > paddleY

  if (isBallSameXAsPaddle && isBallTouchingPaddle) {
    speedY = -speedY;
  }

  console.log('ballY + speedY ', ballY + speedY, ' paddleY ', paddleY)

}
const paddleMovement = () => {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } 
  else
  if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

const cleanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const initEvents = () => {

  const keyDowndHandler = (e) => {
    const { key } = e;

    if (key === 'ArrowRight' || key === 'Right') {
      rightPressed = true;
    } 
    else
    if (key === 'ArrowLeft' || key === 'Left') {
      leftPressed = true;
    }
  }

  const keyUpHandler = (e) => {
    const { key } = e;
    if (key === 'ArrowRight' || key === 'Right') {
      rightPressed = false;
    }
    else
    if (key === 'ArrowLeft' || key === 'Left') {
      leftPressed = false;
    }
  }

  document.addEventListener('keydown' , keyDowndHandler)
  document.addEventListener('keyup', keyUpHandler)
}

const dram = () => {
  cleanCanvas()
  initEvents()
  // hay que dibujar los elementos
  dramBall()
  dramPaddle()
  dramBricks()

  // colisiones y movimientos
  collisionDetection()
  ballMovement()
  paddleMovement()
  
  window.requestAnimationFrame(dram);
}

dram();
