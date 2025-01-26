/*
 * Base Entity Class
 *
 * The Entity class acts as a wrapper for three.js objects
 * Used in the SceneManager to run animations, track extra data for shaders etc.
 */

import * as THREE from "three";

let ID_COUNTER = 0;

export interface EntityParams {
  position: { x: number; y: number; z: number };
}

export class Entity {
  id: number;
  name: string;
  object: THREE.Object3D;
  constructor(
    name: string,
    object: THREE.Object3D,
    params: EntityParams = {
      position: { x: 0, y: 0, z: 0 },
    }
  ) {
    ID_COUNTER += 1;
    this.id = ID_COUNTER;
    this.name = name;
    this.object = object;
    this.applyEntityParams(params);
  }

  defineObject(): THREE.Object3D {
    return new THREE.Object3D();
  }

  applyEntityParams(params: EntityParams) {
    this.object.position.set(
      params.position.x,
      params.position.y,
      params.position.z
    );
  }

  animate() {}
}
