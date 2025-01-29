/*
 * Scene Manager
 *
 * Contains and manages the root scene, renderer and camera
 * Adds entities / objects into the scene and runs entity animations
 */

import * as THREE from "three";
import { Entity } from "./entity";

export class SceneManager {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  entities: Entity[];
  objects: THREE.Object3D[];
  clock: THREE.Clock;

  constructor(width: number, height: number) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.entities = [];
    this.objects = [];
    this.clock = new THREE.Clock();
  }

  init() {
    this._initScene();
    this._initCamera();
    this._initRenderer();
    document.body.appendChild(this.renderer.domElement);
  }

  _initScene() {
    this.scene.background = new THREE.Color(0xaaccff);
  }

  _initCamera() {
    this.camera.position.z = 5;
    this.camera.position.y = 5;
    this.camera.position.set(2, 3, 3);
  }

  _initRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  getRenderer() {
    return this.renderer;
  }

  getCamera() {
    return this.camera;
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  update() {
    this.entities.forEach((entity) => {
      entity.animate();
    });

    this.renderer.render(this.scene, this.camera);
  }

  async initEntities(entities: Entity[]) {
    this.entities = entities;
    for (let i = 0; i < this.entities.length; i++) {
      await this.entities[i].init();
    }
  }

  setEntities() {
    this.entities.forEach((entity) => {
      if (entity.object) {
        this.scene.add(entity.object);
      }
    });
  }

  setObjects(objects: THREE.Object3D[]) {
    this.objects = objects;
    objects.forEach((object) => {
      this.scene.add(object);
    });
  }
}
