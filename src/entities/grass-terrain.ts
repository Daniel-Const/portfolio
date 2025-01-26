import * as THREE from "three";
import { Entity, EntityParams } from "../entity";

// Placeholder grass terrain
// TODO: Replace with custom grass shader / geometry
// Source: https://jsfiddle.net/felixmariotto/hvrg721n/

const vertexShader = `
    varying vec2 vUv;
    uniform float time;
    
      void main() {
  
      vUv = uv;
      
      // VERTEX POSITION
      
      vec4 mvPosition = vec4( position, 1.0 );
      #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
      #endif
      
      // DISPLACEMENT
      
      // here the displacement is made stronger on the blades tips.
      float dispPower = 1.0 - cos( uv.y * 3.1416 / 2.0 );
      
      float displacement = sin( mvPosition.z + time * 10.0 ) * ( 0.1 * dispPower );
      mvPosition.z += displacement;
      
      
      vec4 modelViewPosition = modelViewMatrix * mvPosition;
      gl_Position = projectionMatrix * modelViewPosition;
  
      }
  `;

const fragmentShader = `
    varying vec2 vUv;
    
    void main() {
        vec3 baseColor = vec3( 0.41, 1.0, 0.5 );
      float clarity = ( vUv.y * 0.5 ) + 0.5;
      gl_FragColor = vec4( baseColor * clarity, 1 );
    }
  `;

const uniforms = {
  time: {
    value: 0,
  },
};

const leavesMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
  side: THREE.DoubleSide,
});

const instanceNumber = 5000;
const dummy = new THREE.Object3D();

const geometry = new THREE.PlaneGeometry(0.1, 1, 1, 4);
geometry.translate(0, 0.5, 0);

const instancedMesh = new THREE.InstancedMesh(
  geometry,
  leavesMaterial,
  instanceNumber
);

for (let i = 0; i < instanceNumber; i++) {
  dummy.position.set((Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10);

  dummy.scale.setScalar(0.5 + Math.random() * 0.5);
  dummy.rotation.y = Math.random() * Math.PI;
  dummy.updateMatrix();
  instancedMesh.setMatrixAt(i, dummy.matrix);
}

export class GrassTerrain extends Entity {
  leavesMaterial: any;
  clock: THREE.Clock;
  constructor(params?: EntityParams) {
    super("Terrain", instancedMesh, params);
    this.leavesMaterial = leavesMaterial;
    this.clock = new THREE.Clock();
  }

  animate() {
    this.leavesMaterial.uniforms.time.value = this.clock.getElapsedTime();
    this.leavesMaterial.uniformNeedUpdate = true;
  }
}
