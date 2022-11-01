import * as THREE from 'three';
import { PerspectiveCamera } from 'three';



import useDebug from '@/composables/useDebug';


export default class Camera {
  // instance: PerspectiveCamera;
  instance: any
  animations: any
  coordinates: any
  lookTarget: any
  controls: any
  

  constructor(fov: number, width: number, near: number, far: number, height?: number) {
    this.instance = new PerspectiveCamera(fov, width, near, far);
    this.instance.position.x = 33
    this.instance.position.y =  3.3
    this.instance.position.z =  0
   
    //this.instance = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0, 10000 );
  }

  resize(cam) {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
  }
  
  tweak() {
    const debug = useDebug();

    const camera_page = debug.panel.addFolder({
      title: 'Camera',
      expanded: false,
    });

    camera_page.addInput(this.instance, 'position')
    camera_page.addInput(this.instance, 'rotation')

  }


}
