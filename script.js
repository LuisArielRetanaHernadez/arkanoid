const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

const ballRadius = 5;

// -------------- variables de la pelota
// posicion de la pelota
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;

// velocidad de la pelota
let speedx = 2;
let speedY = -2;

// paleta
const paddleHeight = 10;
const paddleWidth = 75;

// -------------- variables de la paleta --------------
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

let rightPressed = false;
let leftPressed = false;

// -------------- variables ladrillos --------------
const brickRowCount = 5
const brickColumnCount = 12
const brickWidth = 40
const brickHeight = 20
const brickPadding = 2
const brickOffsetTop = 30
const brickOffsetLeft = 150
const bricks = []

const BRICK_STATUS = {
  ACTIVE: 1,
  DESTROYED: 0
}

// >>>>>>>>>>> ladrillos

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    const bricjX = c * (brickWidth + brickPadding) + brickOffsetLeft
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
    bricks[c][r] = { x: bricjX, y: brickY, status: BRICK_STATUS.ACTIVE, color: '#0079FF' }
  }
}

const dramBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r]
      if (brick.status === BRICK_STATUS.ACTIVE) {
        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight)
        ctx.fill()
      }
    }
  }
}

// >>>>>>>>>>> pelota

const dramBall = () => {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#F72798';
  ctx.fill();
  ctx.closePath();
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

// >>>>>>>>>>>> paleta

const dramPaddle = () => {
  ctx.fillStyle = '#0079FF';
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
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

// >>>>>>>>>>>> coleciones
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

  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r]
      if (brick.status === BRICK_STATUS.ACTIVE) {
        if (ballX > brick.x && ballX < brick.x + brickWidth && ballY > brick.y && ballY < brick.y + brickHeight) {
          speedY = -speedY
          brick.status = BRICK_STATUS.DESTROYED
        }
      }
    }
  }
 
}

// >>>>>>>>>>>> renderizar el canvas
const cleanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// >>>>>>>>>>>> escuchar eventos de las flechas izquierda y derecha
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
  cleanCanvas() // renderizar la pelota
  initEvents() // escucha de los eventos de las flechas izuierda he derecha

  // ladrillos
  dramBricks()

  // pelota
  dramBall()
  ballMovement()

  // paleta
  dramPaddle()
  paddleMovement()

  // colisiones
  collisionDetection()

  
  
  window.requestAnimationFrame(dram);
}

// dram();
