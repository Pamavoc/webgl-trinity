import * as THREE from 'three';
import { ObjectType } from '@/classes/interfaces/ObjectType';
import Raycaster from '@/classes/Raycaster';
import Camera from '@/classes/Camera';
import Renderer from '@/classes/Renderer';
import Loader from '@/classes/Loader';
import Scene from '@/classes/Scene';
import Materials from '@/classes/Materials';
import useAudio from '@/composables/useAudio';
import useAnimations from '@/composables/useAnimations';
import CameraManager from '@/classes/managers/CameraManager'
import Stats from '@/classes/Stats';


export default class WebGL {
  cameraManager: CameraManager
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
  debug: boolean;
  params: ObjectType;
  stats: any

  raycast: Raycaster;
  emitter: any;

  audio_started: boolean;
  audio_manager: any;
 

  constructor({ emitter }: any) {
    
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


    // MANAGERS
    this.cameraManager = new CameraManager({ webgl: this})
    this.animations = useAnimations()
    this.animations.createAnimations(this.camera)

    // RAYCASTER
    this.raycast = new Raycaster(
      this.scene.instance,
      this.camera.instance,
      this.renderer.instance
    );

      
    // MATERIALS
    this.materials = new Materials({ webgl: this })
    this.setEvents();
    this.loadMap('trinity-3.glb')


    if (/debug/.test(window.location.href)) {
      this.debug = true
      this.camera.tweak()
      this.scene.postProcess.tweak()
      this.materials.tweak()
      this.stats = new Stats(this)
    }


    console.log('%c Built by @pamavoc ', 'background: #090909; color: #1ECA9A');
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

  experienceEvents = () => {
    this.emitter.on('studio', () => {
      this.animations.studio.ui.restore()
    })

    this.emitter.on('home', ()=> {
      this.animations.studio.ui.hide()
    })


   

    this.emitter.on('audio_started', () => {

      // trigger anim webgl
      // const target = new THREE.Vector3(0, 1, 0)
      // const cube = this.scene.instance.getObjectByProperty('name', 'cube-base');
      // console.log(cube)
      this.animations.play('Micro-anim')
      

    
      setTimeout(() => {
        // this.animations.createIntroduction(this.camera)
        this.animations.play('Introduction')

        this.materials.playVideos()
        this.audio_manager = useAudio(this.emitter)
       
        this.audio_manager.start( {
             onBeat: ()=> {
  
              const average = this.audio_manager.values.reduce((a, b) => a + b, 0) / this.audio_manager.values.length;
              this.emitter.emit('beat_sent', average)
             }, 
             live: false,
             playlist: ['/sounds/initialisation.mp3', '/sounds/megatron-ss.mp3', '/sounds/burningman-s.mp3']
        })    
        this.audio_started = true 
      }, 2300);
    

      // window.audio = this.audio_manager
      
    })
  }


  setEvents = () => {
    this.addEvents();
    this.experienceEvents();
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

    // console.log(this.camera.instance.rotation)

    // Audio data
    if(this.audio_started === true) {
        this.audio_manager.update()
        //console.log(this.audio_manager.values)
    }

    if(this.debug) {
      this.stats.update()
    }

    // Scene
    this.scene.update();
  }
}   