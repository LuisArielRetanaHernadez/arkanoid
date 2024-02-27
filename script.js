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
  ejeX += speedx;
  ejeY += speedY;
  
}
const ballMovement = () => {}
const paddleMovement = () => {}

const dram = () => {

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
