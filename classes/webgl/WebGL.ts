import * as THREE from 'three';
import { ObjectType } from '@/classes/webgl/interfaces/ObjectType';
import Raycaster from '@/classes/webgl/base/Raycaster';
import Camera from '@/classes/webgl/base/Camera';
import Renderer from '@/classes/webgl/base/Renderer';
import Loader from '@/classes/webgl/managers/Loader';
import Scene from '@/classes/webgl/base/Scene';
import Materials from '@/classes/webgl/base/Materials';

export default class WebGL {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: Renderer;
  clock: THREE.Clock;
  loader: Loader;
  rafUpdate: Function | null = null;
  animations: any
  materials: Materials

  width: number;
  height: number;

  debug: boolean;
  params: ObjectType;

  raycast: Raycaster;
  emitter: any;
  data: any

  constructor({ emitter }) {
    // ARGS
    this.emitter = emitter;

    // VARS
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // BASE THREE
    this.clock = new THREE.Clock();
    this.loader = new Loader({ webgl: this });

    this.camera = new Camera(50, this.width / this.height, 0.5, 1000); // perspective camera
    //this.camera = new Camera(75, this.width, this.height, 0, 1000); // ortho camera
    this.renderer = new Renderer(this.width, this.height);
    this.scene = new Scene(this);

    this.raycast = new Raycaster(
      this.scene.instance,
      this.camera.instance,
      this.renderer.instance
    );

    this.materials = new Materials({ webgl: this })
   
    this.setEvents();



    if(window.location.pathname === "/scene") {

      document.body.addEventListener('keydown', e => {
        e.preventDefault()
      
        console.log(e)

        if(e.code === "Digit1") {

          this.switchMap('TOUR1.glb')          

        } else if(e.code === "Digit2") {

          this.switchMap('TOUR2.glb')          

        } else if(e.code === "Digit3") {


          this.switchMap('TOUR3.glb') 

        } else if(e.code === "Digit4") {


          this.switchMap('TOUR4.glb') 

        } else if(e.code === "Digit5") {

          this.switchMap('TOUR5.glb') 

        } else if(e.code === "Digit6") {

          this.switchMap('TOUR6.glb') 

        } 
    
      });
    }

  }



  switchMap = (map) => {
    this.removeOldMap().then(()=> this.loadMap(map))
  }



  loadMap = async (new_map) => {
    this.loader.load(`src/assets/3d/maps/${new_map}`).then((result) => {
      console.log("new map added")
      this.scene.instance.add(result)
    })
  }



  removeOldMap = async () => {
    const old_map = this.scene.instance.children.find(child => child.name === "Scene")
    this.scene.instance.remove(old_map)
    console.log('old map removed')
    return 'old map removed'

  }

  applyChanges = async (data) => {

    // si on a des changements de map, on les applique
    if (Object.keys(data.map_changes).length !== 0) {

      const new_map = data.map_changes.gltf
      if (new_map) this.loadMap(new_map)

      const newFieldsColor = data.map_changes.fields_color
      const newFogColor = data.map_changes.fog_color;
      const newGroundColor = data.map_changes.ground_color;
      const newTreesColor = data.map_changes.trees_color;

      if (newFieldsColor) this.materials.changeField(newFieldsColor)
      if (newFogColor) this.scene.changeFog(newFogColor)
      if (newGroundColor) this.materials.changeGround(newGroundColor)
      if (newTreesColor) this.materials.changeTree(newTreesColor)

      // this.camera.moveMapAfterChange()
    }
  }


  setEvents = () => {
    this.addEvents();
    this.onResize();
  };

  addEvents = () => {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.raycast.onMouseMove);
    window.addEventListener('click', this.raycast.onClick);
  };

  removeEvents = () => {
    window.removeEventListener('mousemove', this.raycast.onMouseMove);
    window.removeEventListener('click', this.raycast.onClick);
  };

  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.instance.aspect = this.width / this.height;
    this.camera.instance.updateProjectionMatrix();

    this.renderer.instance.setSize(this.width, this.height);
    this.renderer.instance.setPixelRatio(
      Math.min(window.devicePixelRatio, 1, 2)
    );
  };

  update() {
    // Raycaster
    //this.raycast.raycastHover()

    // Controls
    //this.controls.update();

    // Scene
    this.scene.update();
  }
}   