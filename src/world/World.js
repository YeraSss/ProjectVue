import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Loop } from "./systems/Loop.js";
import { Resizer } from "./systems/Resizer.js";
import { loadBuilding } from "./systems/building.js";

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let controls;
let loop;

class World {
  constructor(container) {
    // Instances of camera, scene, and renderer
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append( renderer.domElement );
    controls = createControls(camera, renderer.domElement);

    // Light Instance, with optional light helper
    const { ambientLight, mainLight } = createLights();
    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    // Responsive handler
    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      this.render();
    };
  }

  async init() {
    const {    
      floor0,
      floor1,
      floor2,
      floor3,
      floor4,
      floor5,
      floor6,
      floor7,
      floor8,
      floor9,
      floor10,
      floor11,
      floor12,
      floor13,
      floor14,
      floor15,
      test4,
      numbers
    } = await loadBuilding();

   

    scene.add(
      floor0,
      floor1,
      floor2,
      floor3,
      floor4,
      floor5,
      floor6,
      floor7,
      floor8,
      floor9,
      floor10,
      floor11,
      floor12,
      floor13,
      floor14,
      floor15,
      test4,
      numbers
      );
    }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
