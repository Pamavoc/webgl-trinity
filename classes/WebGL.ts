import * as THREE from 'three';
import { ObjectType } from '@/classes/interfaces/ObjectType';
import Raycaster from '@/classes/Raycaster';
import Camera from '@/classes/Camera';
import Renderer from '@/classes/Renderer';
import Loader from '@/classes/Loader';
import Scene from '@/classes/Scene';
import Materials from '@/classes/Materials';
import AudioManager from './utils/audio';

export default class WebGL {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: Renderer;
  clock: THREE.Clock;
  loader: Loader;
  rafUpdate: Function | null = null;
  animations: any
  materials: Materials
  audio: any
  width: number;
  height: number;
  audio_manager: AudioManager;

  debug: boolean;
  params: ObjectType;

  raycast: Raycaster;
  emitter: any;

  constructor({ emitter, audio_manager}) {
    // ARGS
    this.emitter = emitter;
    this.audio_manager = audio_manager


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

    this.loadMap('trinity.glb')

    

    document.querySelector('.button-start').addEventListener('click', ()=> {
      this.startManager()
    })
    

  }

  startManager() {
    this.audio_manager.start( {
      onBeat: this.onBeat,
      live: false,
      src: '/sounds/ambient-1.mp3',
      debug: true
    })
  }

  onBeat() {
    console.log(this.onBeat)
  }


  switchMap = (map) => {
    this.removeOldMap().then(()=> this.loadMap(map))
  }



  loadMap = async (new_map) => {
    this.loader.load(`/${new_map}`).then((result) => {
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


    // Scene
    this.scene.update();
  }
}   