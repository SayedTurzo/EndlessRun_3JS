import '../../style.css';

import * as THREE from 'three';
import { initializeScene } from './Helpers/initializeScene';
import * as WindowController from './Helpers/windowController';
import { keys, setIsJumping } from './playerMovement.js';
import { createPlayer, createGround, createEnemy } from './spawnObjects.js';
import { Box, boxCollision } from './box.js';
import { setSkySphere } from './Helpers/SkysphereHelper.js';
import { loadBackgroundMusic } from './Helpers/audioLoader.js';

// Declare isGameOver variable
let isGameOver = false;
let score = 0;
let highestScore = localStorage.getItem('highestScore') || 0; // Retrieve highest score from local storage

const scoreElement = document.createElement('div');
scoreElement.id = 'score';
document.body.appendChild(scoreElement);

const highestScoreElement = document.createElement('div');
highestScoreElement.id = 'highestScore';
document.body.appendChild(highestScoreElement);

// Set initial highest score
updateHighestScore();

//Set size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Get the canvas element
const canvas = document.querySelector('.webgl');

// Initialize the scene
const { scene, camera, renderer } = initializeScene(canvas);

const imagePath = '/Sky/puresky.hdr';
setSkySphere(scene, imagePath);

loadBackgroundMusic(camera);

//Adding window resize ability
WindowController.setupWindowResizeListener(sizes, camera, renderer, render);
WindowController.setupFullscreenOnDoubleClick(canvas);


// Create player and capture the cube object
const cube = createPlayer(scene);

// Create ground
const ground = createGround(scene);

const enemies = [];

let frames = 0
let spawnRate = 200
function animate() {
  const animationId = requestAnimationFrame(animate)
  render();

  // movement code
  cube.velocity.x = 0
  cube.velocity.z = 0
  if (keys.a.pressed) cube.velocity.x = -0.05
  else if (keys.d.pressed) cube.velocity.x = 0.05

  if (keys.s.pressed) cube.velocity.z = 0.05
  else if (keys.w.pressed) cube.velocity.z = -0.05

  cube.update(ground)
  enemies.forEach((enemy) => {
    enemy.update(ground)
    if (
      boxCollision({
        box1: cube,
        box2: enemy
      })
    ) {
      gameOver();
      cancelAnimationFrame(animationId)
    }
  })

  if (frames % spawnRate === 0) {
    if (spawnRate > 20) spawnRate -= 20

    createEnemy(scene, enemies);
  }

  if (cube.position.y < -0.8065312500000301    ) {
    setIsJumping(false);
  }

  frames++;;
  score++;
  updateScore();
}
animate()

// Render scene function
function render() {
  renderer.render(scene, camera);
}

function gameOver() {
  isGameOver = true;
  showGameOver();
  updateHighestScore();
}

function showGameOver() {
  const gameOverOverlay = document.getElementById('gameOverOverlay');
  gameOverOverlay.style.display = 'block';
}

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
  location.reload(); // Reload the page to restart the game
});

function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

function updateHighestScore() {
  if (score > highestScore) {
    highestScore = score+1;
    localStorage.setItem('highestScore', highestScore); // Save highest score to local storage
  }
  highestScoreElement.textContent = `Highest Score: ${highestScore}`;
}