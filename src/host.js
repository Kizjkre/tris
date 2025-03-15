import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// REF: https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_unreal_bloom_selective.html

const BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

const params = {
  threshold: 0,
  strength: 1,
  radius: 0.5,
  exposure: 1
};

const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
const materials = {};

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

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const mixPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture }
    },
    vertexShader: await (await fetch('shaders/bloom.vert')).text(),
    fragmentShader: await (await fetch('shaders/bloom.frag')).text(),
    defines: {}
  }), 'baseTexture'
);
mixPass.needsSwap = true;

const outputPass = new OutputPass();

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(mixPass);
finalComposer.addPass(outputPass);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

  bloomComposer.setSize(width, height);
  finalComposer.setSize(width, height);

  render();
});

const setupScene = () => {
  scene.traverse(disposeMaterial);
  scene.children.length = 0;

  render();
}

const disposeMaterial = obj => obj.material && obj.material.dispose();

const render = () => {
  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.traverse(restoreMaterial);
  // render the entire scene, then render bloom scene on top
  finalComposer.render();
}

const darkenNonBloomed = obj => {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

const restoreMaterial = obj => {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

setupScene();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const spheres = {};
const factor = 0.02

const socket = new WebSocket('wss://localhost:3000/data');

socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);

  Object.entries(data).forEach(([address, { x, y, z }]) => {
    if (address in spheres) {
      spheres[address].position.set(x * factor, y * factor, z * factor);
    } else {
      const geometry = new THREE.IcosahedronGeometry(1, 15);

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);

      const material = new THREE.MeshBasicMaterial({ color: color });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x * factor, y * factor, z * factor);
      sphere.position.normalize().multiplyScalar(Math.random() * 4.0 + 2.0);
      scene.add(sphere);

      sphere.layers.enable(BLOOM_SCENE);

      spheres[address] = sphere;
    }
  });

  Object.keys(spheres).filter(address => !(address in data)).forEach(address => {
    const sphere = spheres[address];
    scene.remove(sphere);
    delete spheres[address];
  });

  render();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

new QRCode(document.getElementById('qr'), {
  text: 'https://' + await (await fetch('/ip')).text() + ':3000',
  colorDark: '#eee',
  colorLight: '#000'
});
