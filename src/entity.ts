/*
 * Base Entity Class
 *
 * The Entity class acts as a wrapper for three.js objects
 * Used in the SceneManager to run animations, track extra data for shaders etc.
 */

import * as THREE from "three";

let ID_COUNTER = 0;

export interface EntityParams {
  position?: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number };
}

export class Entity {
  id: number;
  name: string;
  object: THREE.Object3D | undefined;
  params: Partial<EntityParams>;
  constructor(
    name: string,
    params: Partial<EntityParams> = {
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    }
  ) {
    ID_COUNTER += 1;
    this.id = ID_COUNTER;
    this.name = name;
    this.params = params;
  }

  async init() {
    this.object = await this._init();
    this.applyEntityParams();
  }

  async _init() {
    return new THREE.Object3D();
  }

  defineObject(): THREE.Object3D {
    return new THREE.Object3D();
  }

  applyEntityParams() {
    if (!this.object) return;
    if (this.params.position) {
      this.object.position.set(
        this.params.position.x,
        this.params.position.y,
        this.params.position.z
      );
    }

    if (this.params.scale) {
      this.object.scale.set(
        this.params.scale.x,
        this.params.scale.y,
        this.params.scale.z
      );
    }
  }

  animate() {}
}
