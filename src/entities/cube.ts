import * as THREE from "three";

import { Entity, EntityParams } from "../entity";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({ color: 0x559900 })
);

export class SpinnyCube extends Entity {
  constructor(params?: EntityParams) {
    super("cube", cube, params);
  }

  animate() {
    this.object.rotation.x += 0.01;
    this.object.rotation.y += 0.01;
  }
}
