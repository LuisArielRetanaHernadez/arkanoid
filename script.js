const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

const ballRadius = 5;

// posicion de la pelota
let ejeX = canvas.width / 2;
let ejeY = canvas.height - 30;

// velocidad de la pelota
let speedx = 2;
let speedY = -2;


const dramBall = () => {
  ctx.beginPath();
  ctx.arc(ejeX, ejeY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#F72798';
  ctx.fill();
  ctx.closePath();
}
const dramPaddle = () => {}
const dramBricks = () => {}

const collisionDetection = () => {
  if (ejeX + speedx > canvas.width - ballRadius || ejeX + speedx < ballRadius) {
    speedx = -speedx;
  } 

  if (ejeY + speedY < ballRadius) {
    speedY = -speedY;
  }

  // if (ejeY + speedY > canvas.height - ballRadius) {
  //   document.location.reload();
  // }
 
}
const ballMovement = () => {
  ejeX += speedx;
  ejeY += speedY;
}
const paddleMovement = () => {}

const cleanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const dram = () => {
  cleanCanvas()
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
