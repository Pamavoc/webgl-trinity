import * as THREE from 'three';
import useDebug from "@/composables/useDebug";
import { lerp } from "three/src/math/MathUtils";

export default class Cameras {
	webgl:any
	scene:any
	cameras: any
	currentCamera: any

	constructor(args) {
        this.webgl = args.webgl
		this.scene = args.webgl.scene
	}

	setCam(camera) {

		if(this.currentCamera) this.scene.remove(this.currentCamera.instance)

		this.currentCamera = camera
		this.scene.add(this.currentCamera.instance)
    }

	resize() {
		this.currentCamera.resize(this.currentCamera);
		// this.mainCamera.resize();
	}


	update(dt) {
		this.currentCamera.instance.update(dt)
	}

}