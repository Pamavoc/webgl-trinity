import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera, Renderer } from 'three';

export default class Controls {
  instance: OrbitControls;

  constructor(camera: PerspectiveCamera, renderer: Renderer) {
    this.instance = new OrbitControls(camera, renderer.domElement);
    //this.instance.autoRotate = true
  }

  update() {
    this.instance.update();
    //console.log("update")
  }
}
