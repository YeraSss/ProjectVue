import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  //enable controls?
  controls.enabled = true;

  

  //smooth camera:
  // remember to add to loop updatables to work
  controls.dampingFactor = 0.04;
  controls.maxDistance = 35;
  controls.minDistance = 15;
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;

  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
