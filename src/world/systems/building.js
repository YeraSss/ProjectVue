import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { setupModel } from './setupModel.js';

async function loadBuilding() {
  const loader = new GLTFLoader();

  const [floor0Data, floor1Data, floor2Data,
    floor3Data, floor4Data, floor5Data,
    floor6Data, floor7Data, floor8Data,
    floor9Data, floor10Data, floor11Data,
    floor12Data, floor13Data, floor14Data,
    floor15Data, test4Data, numbersData] = await Promise.all([
    loader.loadAsync('src/models/floor0.glb'),
    loader.loadAsync('src/models/floor1.glb'),
    loader.loadAsync('src/models/floor2.glb'),
    loader.loadAsync('src/models/floor3.glb'),
    loader.loadAsync('src/models/floor4.glb'),
    loader.loadAsync('src/models/floor5.glb'),
    loader.loadAsync('src/models/floor6.glb'),
    loader.loadAsync('src/models/floor7.glb'),
    loader.loadAsync('src/models/floor8.glb'),
    loader.loadAsync('src/models/floor9.glb'),
    loader.loadAsync('src/models/floor10.glb'),
    loader.loadAsync('src/models/floor11.glb'),
    loader.loadAsync('src/models/floor12.glb'),
    loader.loadAsync('src/models/floor13.glb'),
    loader.loadAsync('src/models/floor14.glb'),
    loader.loadAsync('src/models/floor15.glb'),
    loader.loadAsync('/src/models/test4.glb'),
    loader.loadAsync('/src/models/numbers.glb'),
  ]);

   

  console.log('Loaded!', floor0Data,floor1Data,floor2Data,
  floor3Data, floor4Data, floor5Data,
  floor6Data, floor7Data, floor8Data,
  floor9Data, floor10Data, floor11Data,
  floor12Data, floor13Data, floor14Data,
  floor15Data, test4Data, numbersData);

  const floor0 = setupModel(floor0Data);
  const floor1 = setupModel(floor1Data);
  const floor2 = setupModel(floor2Data);
  const floor3 = setupModel(floor3Data);
  const floor4 = setupModel(floor4Data);
  const floor5 = setupModel(floor5Data);
  const floor6 = setupModel(floor6Data);
  const floor7 = setupModel(floor7Data);
  const floor8 = setupModel(floor8Data);
  const floor9 = setupModel(floor9Data);
  const floor10 = setupModel(floor10Data);
  const floor11 = setupModel(floor11Data);
  const floor12 = setupModel(floor12Data);
  const floor13 = setupModel(floor13Data);
  const floor14 = setupModel(floor14Data);
  const floor15 = setupModel(floor15Data);
  const test4 = setupModel(test4Data);
  const numbers = setupModel(numbersData);
  

  return {
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
    numbers,
  };
}

export { loadBuilding };