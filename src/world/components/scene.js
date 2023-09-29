import { Color, Scene } from 'three';

function createScene(color) {
  const scene = new Scene();

  scene.background = new Color('skyblue');

  return scene;
}

export { createScene };