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

            console.log(child.name)
          
            if (child.isMesh) {
              child.geometry.computeVertexNormals();

              if (/screen/ig.test(child.name) || child.name === 'face-left' || child.name === 'face-right') {
                child.material = this.webgl.materials.screenMaterial
              }

              else if(/light-face/ig.test(child.name)) {
                child.material = this.webgl.materials.trinityMaterial
              }

              else if (child.name === 'sol') {
                child.material = this.webgl.materials.solMaterial
              }
              else if(/trinity/ig.test(child.name)) {
                child.material = this.webgl.materials.trinityMaterial
              }

              else if (child.name === 'cable' || /led/ig.test(child.name) || /light-desk/ig.test(child.name)) {
                child.material = this.webgl.materials.cableMaterial
              }

              else if (child.name === 'macbook-apple') {
                child.material = this.webgl.materials.defaultGreenMaterial
              }

              else {
                child.material = this.webgl.materials.defaultMaterial
              }
            }

          });

        
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
