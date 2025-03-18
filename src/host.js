import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// REF: https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_unreal_bloom_selective.html

const params = {
  threshold: 0,
  strength: 1,
  radius: 0.5,
  exposure: 1
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;

const outputPass = new OutputPass();

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outputPass);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);
});

const render = () => {
  Object.values(spheres).forEach(sphere => {
    const x = THREE.MathUtils.lerp(sphere.position.x, sphere._TRIS_position.x, 0.5);
    const y = THREE.MathUtils.lerp(sphere.position.y, sphere._TRIS_position.y, 0.5);
    const z = THREE.MathUtils.lerp(sphere.position.z, sphere._TRIS_position.z, 0.5);
    sphere.position.set(x, y, z);
  });
  composer.render();
};
renderer.setAnimationLoop(render);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const spheres = {};

const socket = new WebSocket('wss://localhost:3000/data');

socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  Object.entries(data).forEach(([address, { x, y, z, h, s, l, v }]) => {
    if (address in spheres) {
      spheres[address]._TRIS_position = { x, y, z };
      spheres[address].material.color.setHSL(h, s, +l + +v);
    } else {
      const geometry = new THREE.IcosahedronGeometry(1, 1);

      const color = new THREE.Color();
      color.setHSL(h, s, l);

      const material = new THREE.MeshBasicMaterial({ color: color });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      sphere._TRIS_position = { x, y, z };
      sphere.position.normalize().multiplyScalar(Math.random() * 4.0 + 2.0);
      scene.add(sphere);

      spheres[address] = sphere;
    }
  });

  Object.keys(spheres).filter(address => !(address in data)).forEach(address => {
    const sphere = spheres[address];
    scene.remove(sphere);
    delete spheres[address];
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

new QRCode(document.getElementById('qr'), {
  text: 'https://' + await (await fetch('/ip')).text() + ':3000',
  colorDark: '#eee',
  colorLight: 'transparent'
});
