import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Generator2() {
  const canvasRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  let scene, renderer, camera, controls, mixer;

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    init();
  }, [windowSize]);

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(30, windowSize.width / windowSize.height, 1, 20000);
    camera.position.z = -50;
    camera.position.x = 50;
    camera.position.y = 0;

    const ambientLight = new THREE.AmbientLight(0xE6E6E6, 1);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xE6E6E6, 1, 0);
    light1.position.set(0, 200, 0);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xE6E6E6, 1, 0);
    light2.position.set(100, 200, 100);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xE6E6E6, 1, 0);
    light3.position.set(-100, -200, -100);
    scene.add(light3);

    const hemiLight = new THREE.HemisphereLight(0x000000, 0x000000, 0.50);
    scene.add(hemiLight);

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current, alpha: true });
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.outputEncoding = THREE.sRGBEncoding;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/gltf/scene.gltf', function (gltf) {
      const model = gltf.scene;
      const animations = gltf.animations;

      mixer = new THREE.AnimationMixer(model);
      for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];
        mixer.clipAction(animation).play();
      }

      model.scale.set(0.8, 0.8, 0.8);
      scene.add(model);

      function animate() {
        mixer.update(0.0167);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }

      animate();
    });
  }

  function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setWindowSize({ width, height });

    if (camera && renderer) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', paddingLeft: '55px'}}>
      <canvas ref={canvasRef} id="canvas" style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
}
