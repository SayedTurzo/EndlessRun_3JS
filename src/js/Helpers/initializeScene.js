import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function initializeScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // Set camera position
  camera.position.set(-0.000050249377494495284, 4, 4.301789273496814);

  // Set camera rotation
  camera.rotation.set(-0.3, 0, -0.000006271470316379076);
  camera.rotation.order = 'XYZ';

  // Camera orbit helper
  //const orbit = new OrbitControls(camera, renderer.domElement);
  //orbit.update();

  // Add lights to the scene
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.y = 3;
  light.position.z = 1;
  light.castShadow = true;
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 2));

  camera.position.z = 5;

  return { scene, camera, renderer };
}
