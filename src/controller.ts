import { Camera } from "three";
import {
  OrbitControls,
  PointerLockControls,
} from "three/examples/jsm/Addons.js";

export class PointerLockController {
  _controls: PointerLockControls;
  moveLeft: boolean = false;
  moveRight: boolean = false;
  moveForward: boolean = false;
  moveBack: boolean = false;
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
  speed: number;
  constructor(camera: Camera, renderer: HTMLElement) {
    this._controls = new PointerLockControls(camera, renderer);
    this.onKeyDown = (event: KeyboardEvent) => {
      this._handleKeyDown(event);
    };
    this.onKeyUp = (event: KeyboardEvent) => {
      this._handleKeyUp(event);
    };

    this.speed = 5;
  }

  getObject() {
    return this._controls.object;
  }

  isLocked() {
    return this._controls.isLocked;
  }

  _handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyW":
        this.moveForward = true;
        break;
      case "KeyA":
        this.moveLeft = true;
        break;
      case "KeyS":
        this.moveBack = true;
        break;
      case "KeyD":
        this.moveRight = true;
        break;
    }
  }

  _handleKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyW":
        this.moveForward = false;
        break;
      case "KeyA":
        this.moveLeft = false;
        break;
      case "KeyS":
        this.moveBack = false;
        break;
      case "KeyD":
        this.moveRight = false;
        break;
    }
  }

  lock() {
    this._controls.lock();
  }

  unlock() {
    this._controls.unlock();
  }

  update(delta: number) {
    if (this._controls.isLocked) {
      if (this.moveForward) this._controls.moveForward(this.speed * delta);
      if (this.moveBack) this._controls.moveForward(-this.speed * delta);
      if (this.moveLeft) this._controls.moveRight(-this.speed * delta);
      if (this.moveRight) this._controls.moveRight(this.speed * delta);
    }

    this._controls.update(delta);
  }
}

export class OrbitController {
  _controls: OrbitControls;
  constructor(camera: Camera, renderer: HTMLElement) {
    this._controls = new OrbitControls(camera, renderer);
  }
}
