import { PointLight, AmbientLight } from 'three';

function createLights() {
  const ambientLight = new AmbientLight(
    0xFFFFFF,
    0,5
  );

  const mainLight = new PointLight(0xFFFFFF, 0,5);
  mainLight.position.set(2, 3, 4);

  return { ambientLight, mainLight };
}

export { createLights };