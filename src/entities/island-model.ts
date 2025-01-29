import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Entity, EntityParams } from "../entity";

export class IslandModel extends Entity {
  constructor(params?: EntityParams) {
    super("Plane Model", params);
  }

  async _init() {
    const loader = new GLTFLoader();
    const object = await loader.loadAsync("./src/models/island-02.glb");
    return object.scene;
  }
}
