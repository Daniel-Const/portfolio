import "./style.css";
import { SceneManager } from "./scene";
import { entities, objects } from "./world";
import { OrbitController } from "./controller";
const sceneManager = new SceneManager(window.innerWidth, window.innerHeight);
sceneManager.init();

function render() {
  sceneManager.update();
}

// Controller
const controller = new OrbitController(
  sceneManager.getCamera(),
  sceneManager.getRenderer().domElement
);

// Load world items
sceneManager.setObjects(objects);
await sceneManager.initEntities(entities);

sceneManager.setEntities();
sceneManager.renderer.setAnimationLoop(render);

const onWindowResize = () => {
  sceneManager.resize(window.innerWidth, window.innerHeight);
};

document.addEventListener("resize", onWindowResize, false);
