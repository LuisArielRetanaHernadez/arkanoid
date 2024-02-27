const canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

const ballRadius = 5;

// posicion de la pelota
const ejeX = canvas.width / 2;
const ejeY = canvas.height - 30;

// velocidad de la pelota
const speedx = 2;
const speedY = -2;


const dramBall = () => {}
const dramPaddle = () => {}
const dramBricks = () => {}

const collisionDetection = () => {}
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
