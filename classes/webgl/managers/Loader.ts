import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as THREE from 'three';



export default class Loader {
  loader: GLTFLoader
  textureLoader: THREE.TextureLoader
  toon: any
  webgl: any


  constructor(args: any) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(dracoLoader);

    this.textureLoader = new THREE.TextureLoader()

    this.webgl = args.webgl


    // const shaderMat = new THREE.ShaderMaterial({ 
    //   // fragmentShader: , 
    //   // vertexShader: ,
    //   lights: true, 
    // })
  }

  load(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        gltf => {

          gltf.scene.traverse(child => {

            // if (child.name === 'fumée') {
            //   // todo fumée 
            // }



            if (child.isMesh) {
              child.geometry.computeVertexNormals();

              // if (child.name === 'trees') {
              if (/tree/ig.test(child.name)) {
                child.material = this.webgl.materials.treeMaterial
              }
              else if (child.name === 'carte') {
                child.material = this.webgl.materials.groundMaterial
              }
              else if (child.name === 'eau') {
                // child.removeFromParent()
                // child.material = this.webgl.materials.waterMaterial
              }
              else if (child.name === 'champs') {
                child.material = this.webgl.materials.fieldMaterial
              }

              else if (child.name === 'champs') {
                // child.position.y += 0.1;
                child.material = this.webgl.materials.defaultMaterial
              }

              else {
                child.material = this.webgl.materials.defaultMaterial
              }
            }

          });

          // second trees
          gltf.scene.traverse(child => {
            if (child.isGroup && /tree/ig.test(child.name)) {
              child.children.forEach(mesh => {
                mesh.material = this.webgl.materials.treeMaterial
              })
            }
          })

          //water replace
          const water = gltf.scene.getObjectByName('eau', true)
          water.removeFromParent()
          const water_geometry = new THREE.PlaneGeometry(200, 200, 800, 800);
          const water_mesh = new THREE.Mesh(water_geometry, this.webgl.materials.waterMaterial);
          water_mesh.rotation.set(-Math.PI / 2, 0, 0);
          water_mesh.position.set(0, 0.1, 0);
          gltf.scene.add(water_mesh)





          //console.log(gltf.scene);
          resolve(gltf.scene);

          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Group
          gltf.scenes; // Array<THREE.Group>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // called when loading has errors
        function (error) {
          console.log('An error happened');
          reject(error);
        }
      );
    });
  }


  loadTexture(url) {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        texture => {

          // console.log(texture);
          resolve(texture);
        },

        // called while loading is progressing
        function (xhr) {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // called when loading has errors
        function (error) {
          console.error('An error happened');
          reject(error);
        }
      );
    });
  }
}
