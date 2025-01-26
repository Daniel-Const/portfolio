import "./style.css";
import { SceneManager } from "./scene";
import { Clock } from "three";
import { entities, objects } from "./world";
import { Controller } from "./controller";

const clock = new Clock();
const sceneManager = new SceneManager();
sceneManager.init();
sceneManager.renderer.setAnimationLoop(render);

// Controller
const controller = new Controller(
  sceneManager.getCamera(),
  sceneManager.getRenderer().domElement
);
sceneManager.scene.add(controller.getObject());

function render() {
  const delta = clock.getDelta();
  controller.update(delta);
  sceneManager.update();
}

// Load world items
sceneManager.setEntities(entities);
sceneManager.setObjects(objects);

// Handle pausing
const pauseMenu = document.getElementById("pauseMenu");
document.addEventListener("click", () => {
  if (!controller.isLocked()) {
    controller.lock();
  }
});

controller._controls.addEventListener("lock", () => {
  if (pauseMenu) {
    pauseMenu.style.display = "none";
  }
});

controller._controls.addEventListener("unlock", () => {
  if (pauseMenu) {
    pauseMenu.style.display = "flex";
  }
});

const onWindowResize = () => {
  sceneManager.resize(window.innerWidth, window.innerHeight);
};

document.addEventListener("keydown", controller.onKeyDown, false);
document.addEventListener("keyup", controller.onKeyUp, false);
document.addEventListener("resize", onWindowResize, false);
