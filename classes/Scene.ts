import * as THREE from 'three';
import Controls from '@/classes/Controls';
import PostProcess from '@/classes/PostProcessing';
import TransitionCamera from '@/classes/managers/TransitionCamera';

export default class Scene {
  renderer: any;
  composer: any;
  instance: THREE.Scene;
  camera: any;
  controls: any;
  webgl: any;
  uniforms: any;
  material: any;
  params: any
  lights: any
  postProcess: any
  clock: any
  transition: any

  constructor(webgl) {

    this.params = {
      background: 0x080808,
      ambient_light: 0x020202,
      directional_light: 0xffffff,
      mat_color: 0xffffff,
    }

    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(this.params.background)
    this.renderer = webgl.renderer.instance;
    this.camera = webgl.camera.instance;
    this.webgl = webgl;

    this.clock = new THREE.Clock();
    this.postProcess = new PostProcess({ scene: this })
 
    this.createFog();
    this.controls = new Controls(this.camera, this.renderer);
    this.transition = new TransitionCamera({ webgl: this.webgl, scene: this })
    console.log(this.controls)
  
    // this.changeFog('green')
   
    this.createLights()
  
  }


  createFog() {
    const color = this.params.background;  // white
    const near = 30;
    const far = 70;
    this.instance.fog = new THREE.Fog(color, near, far);

    const fog_params = {
      color
    }
  }


  changeFog(newColor: string){

    const colors = {
      default: this.params.background,
      grey1: 0xa5a5a5,
      grey2: 0x727272,
      grey3: 0x525252,
      light_blue: 0x95aebf, 
      black: 0x080808,
      green: 0x1ECA9A
    }

    this.instance.fog.color.setHex(colors[newColor])
    this.instance.background.setHex(colors[newColor])
  }

  createLights() {

    this.lights = {
      ambient: null,
      directional: null
    }

    this.lights.ambient = new THREE.AmbientLight(this.params.ambient_light, 0.48);
    this.lights.directional = new THREE.DirectionalLight(this.params.directional_light, 0.83);


    this.lights.directional.position.set(5, 4, 20);
    this.instance.add(this.lights.ambient);
    this.instance.add(this.lights.directional);

  }



  preRender() {

    const elapsedTime = this.clock.getElapsedTime();

    const camera_h = this.camera.position.y * 0.8;
    // console.log(camera_h)
    // console.log(this.camera.position)
    this.instance.fog.near = camera_h + 4;
    this.instance.fog.far = camera_h * 0.6 + 24;

    this.webgl.materials.update(elapsedTime);
    this.transition.update()

   // console.log(this.camera.position.x, this.camera.position.y, this.camera.position.z)
    // this.controls.update();
  }

  render() {
    this.renderer.render(this.instance, this.camera);
  }

  postRenderer() {
    this.postProcess.render();
  }

  update() {
    this.preRender();
    this.render();
    this.postRenderer();
  }


}
