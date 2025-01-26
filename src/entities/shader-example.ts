import * as THREE from "three";

import { Entity, EntityParams } from "../entity";

const plane = new THREE.PlaneGeometry(2000, 2000, 127, 127);
plane.rotateX(-Math.PI / 2);

const vertexShader = `
varying vec3 vUv; 

void main() {
  vUv = position; 

  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}
`;

const fragmentShader = `
  uniform vec3 colorA; 
  uniform vec3 colorB; 
  varying vec3 vUv;

  void main() {
    gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
  }
`;

const uniforms = {
  colorB: { type: "vec3", value: new THREE.Color(0x112233) },
  colorA: { type: "vec3", value: new THREE.Color(0x223344) },
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
});

const mesh = new THREE.Mesh(plane, material);

export class Terrain extends Entity {
  constructor(params?: EntityParams) {
    super("Terrain", mesh, params);
  }

  animate() {}
}
