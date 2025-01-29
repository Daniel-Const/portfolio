/**
 * Example water entity
 *
 * TODO:
 * Change shaders... create custom water shader
 * Remove gl-noise library - implement manually
 */

import * as THREE from "three";

import { Entity, EntityParams } from "../entity";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { patchShaders } from "gl-noise";

export class Water extends Entity {
  clock: THREE.Clock;
  material: CustomShaderMaterial | undefined;
  constructor(params?: EntityParams) {
    super("Terrain", params);
    this.clock = new THREE.Clock();
  }

  async _init() {
    const fileLoader = new THREE.FileLoader();
    const vertexShader = await fileLoader.loadAsync(
      "./src/shaders/watercsm/water.vert"
    );
    const fragmentShader = await fileLoader.loadAsync(
      "./src/shaders/watercsm/water.frag"
    );

    const uniforms = {
      uTime: { value: 0 },
      waterColor: {
        value: new THREE.Color("#52a7f7").convertLinearToSRGB(),
      },
      waterHighlight: {
        value: new THREE.Color("#b3ffff").convertLinearToSRGB(),
      },
      offset: {
        value: 0.4,
      },
      contrast: {
        value: 3.1,
      },
      brightness: {
        value: 1,
      },
      uHeight: {
        value: 0.2,
      },
    };

    const material = new CustomShaderMaterial({
      baseMaterial: THREE.MeshPhysicalMaterial,
      uniforms,
      vertexShader: patchShaders(vertexShader as string) as string,
      fragmentShader: fragmentShader as string,
      color: 0x00526e,
      roughness: 0.2,
      metalness: 0.1,
      flatShading: true,
    });

    this.material = material;

    const box = new THREE.BoxGeometry(20, 20, 0.2, 64, 64, 1);
    const mesh = new THREE.Mesh(box, material);
    mesh.rotateX(-Math.PI / 2);
    return mesh;
  }

  animate() {
    if (this.material) {
      this.material.uniforms.uTime.value = -this.clock.getElapsedTime() / 5;
    }
  }
}
