import { Box } from './box.js';
import { setCube } from './playerMovement.js';

export function createPlayer(scene) {
  const cube = new Box({
    width: 1,
    height: 1,
    depth: 1,
    color: '#FFFF00',
    velocity: {
      x: 0,
      y: -0.01,
      z: 0
    }
  });
  cube.castShadow = true;
  scene.add(cube);
  setCube(cube);
  return cube;
}

export function createGround(scene) {
  const ground = new Box({
    width: 10,
    height: 0.5,
    depth: 50,
    color: '#87CEFA',
    position: {
      x: 0,
      y: -2,
      z: 0
    }
  });
  ground.receiveShadow = true;
  scene.add(ground);
  return ground;
}

export function createEnemy(scene, enemies) {
  const enemy = new Box({
    width: 1,
    height: 1,
    depth: 1,
    position: {
      x: (Math.random() - 0.5) * 10,
      y: 0,
      z: -20
    },
    velocity: {
      x: 0,
      y: 0,
      z: 0.005
    },
    color: 'red',
    zAcceleration: true
  });
  enemy.castShadow = true;
  scene.add(enemy);
  enemies.push(enemy);
}
