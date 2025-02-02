import * as THREE from "three";

import { Entity, EntityParams } from "../entity";

export class SpinnyCube extends Entity {
  constructor(params?: EntityParams) {
    super("cube", params);
  }

  async _init() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color: 0x559900 })
    );

    return cube;
  }

  animate() {
    if (!this.object) return;
    this.object.rotation.x += 0.01;
    this.object.rotation.y += 0.01;
  }
}
