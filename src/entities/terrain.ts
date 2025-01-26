import * as THREE from "three";

import { Entity, EntityParams } from "../entity";

const plane = new THREE.PlaneGeometry(2000, 2000, 127, 127);
plane.rotateX(-Math.PI / 2);
const mesh = new THREE.Mesh(
  plane,
  new THREE.MeshStandardMaterial({ color: new THREE.Color("#ab6a15") })
);

export class Terrain extends Entity {
  constructor(params?: EntityParams) {
    super("Terrain", mesh, params);
  }

  animate() {}
}
