import * as THREE from 'three';
import { PerspectiveCamera } from 'three';
import useAnimations from '@/composables/useAnimations';
import useDebug from '@/composables/useDebug';


export default class Camera {
  // instance: PerspectiveCamera;
  instance: any
  animations: any
  coordinates: any
  lookTarget: any

  constructor(fov: number, width: number, near: number, far: number, height?: number) {
    this.instance = new PerspectiveCamera(fov, width, near, far);
    //this.instance.position.z = -5;
    //this.instance = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0, 10000 );
    this.animations = useAnimations()
  }

  tweak() {
    const debug = useDebug();

    const camera_page = debug.panel.addFolder({
      title: 'Camera',
      expanded: false,
    });


    camera_page.addInput(this.instance, 'position')
  }


}
