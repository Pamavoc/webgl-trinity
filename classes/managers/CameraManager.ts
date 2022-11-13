import * as THREE from 'three';
import useDebug from "@/composables/useDebug";

export default class CameraManager {
	webgl:any
	scene:any
	cameras: any
	currentCamera: any

	constructor(args) {
        this.webgl = args.webgl
		this.scene = args.webgl.scene
	}

	setCam(camera) {

		if(this.currentCamera) this.scene.instance.remove(this.currentCamera.instance)

		this.currentCamera = camera
		this.scene.instance.add(this.currentCamera.instance)
    }

	resize() {
		this.currentCamera.resize(this.currentCamera);
	}


	update(dt) {
		this.currentCamera.instance.update(dt)
	}

}