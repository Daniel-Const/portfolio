/*
 * Instantiate World Entities / Objects
 */

import { SpinnyCube } from "./entities/cube";
import { GrassTerrain } from "./entities/grass-terrain";
import { Terrain } from "./entities/terrain";
import * as THREE from "three";

const light = new THREE.SpotLight(0xffffff, 100);
light.position.set(0, 8, 0);
light.angle = Math.PI;

export const objects = [light, new THREE.AmbientLight(0x404040, 2)];
export const entities = [
  new Terrain(),
  new GrassTerrain(),
  new SpinnyCube({ position: { x: 0, y: 2, z: 0 } }),
];
