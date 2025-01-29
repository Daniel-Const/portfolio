/*
 * Instantiate World Entities / Objects
 */

import { SpinnyCube } from "./entities/cube";
import * as THREE from "three";
import { Water } from "./entities/water";
import { IslandModel } from "./entities/island-model";

const light = new THREE.SpotLight(0xffffff, 100);
light.position.set(0, 8, 0);
light.angle = Math.PI;

export const objects: THREE.Object3D[] = [
  light,
  // new THREE.AmbientLight(0xffffff, 1),
  new THREE.DirectionalLight(0xffffff, 2),
];

export const entities = [
  new Water({ position: { x: 0, y: -0.1, z: 0 } }),
  new IslandModel({
    position: { x: 0, y: 1.5, z: 0 },
    scale: { x: 0.2, y: 0.2, z: 0.2 },
  }),
  new SpinnyCube({
    position: { x: 0, y: 1, z: 0 },
    scale: { x: 0.2, y: 0.2, z: 0.2 },
  }),
];
