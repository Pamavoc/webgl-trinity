import * as THREE from 'three';
import Controls from './Controls';

export default class Scene {
  renderer: any;
  composer: any;
  instance: THREE.Scene;
  camera: any;
  controls: any;
  webgl: any;
  ground: any;
  tPaper: any;
  uniforms: any;
  material: any;
  debug: any
  params: any
  lights: any
  postProcess: any
  clock: any

  constructor(webgl) {

    this.params = {
      background: 0x6f6f6f,
      ambient_light: 0x404040,
      directional_light: 0xffffff,
      mat_color: 0xffffff,
    }

    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(this.params.background)
    this.renderer = webgl.renderer.instance;
    this.camera = webgl.camera.instance;
    this.webgl = webgl;
    this.clock = new THREE.Clock();
    
    this.createFog();
    this.controls = new Controls(this.camera, this.renderer);
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
      light_blue: 0x95aebf
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

   // const elapsedTime = this.clock.getElapsedTime();

    //const camera_h = this.camera.position.y * 0.8;
    // console.log(camera_h)

    //this.instance.fog.near = camera_h + 4;
    //this.instance.fog.far = camera_h * 0.6 + 24;

   // this.webgl.materials.update(elapsedTime);

    this.controls.update();
    
  }

  render() {
    this.renderer.render(this.instance, this.camera);
    //this.postProcess.render();
  }

  postRenderer() {
  }

  update() {
    this.preRender();
    this.render();
    this.postRenderer();
  }


}