import * as THREE from 'three'
import Animations from '@/classes/Animations'

export default class Raycaster {

    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    objects: any
    anims: Animations
    currentIntersect: any

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {

        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.anims = new Animations()


        this.mouse = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()

        this.currentIntersect = null
        //"const rayOrigin = new THREE.Vector3(- 3, 0, 0)
        // const rayDirection = new THREE.Vector3(10, 0, 0)
        // rayDirection.normalize()
       
        this.objects = []
    }


    onMouseMove = (event) => {
        this.mouse.x = event.clientX / this.renderer.domElement.clientWidth * 2 - 1
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1
    }

    onClick = () => {

        if (this.currentIntersect !== null) {

           if(this.currentIntersect.object) {

                switch (this.currentIntersect.object.name) {
                case "Cube":
                    console.log('click Cube')
                    break
                }

    
           }
           
        }
    }

    setObjectsScene = (scene: string) => {
        if(scene === "home") {

            const cube = this.scene.getObjectByProperty('name', 'Cube');
            this.objects.push(cube)

        } 
    }

    raycastHover = () => {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.objects, true)

        
        if (intersects.length) {
            if (!this.currentIntersect) {
                console.log('mouse enter')
            }

            this.currentIntersect = intersects[0]
        }
        else {
            if (this.currentIntersect) {
                console.log('mouse leave')
            }

            this.currentIntersect = null
        }
        
        
    }
}