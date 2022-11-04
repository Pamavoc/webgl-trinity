import { getProject, types as t } from '@theatre/core'
import { ObjectType } from '@/classes/interfaces/ObjectType';
import gsap from 'gsap'
import introductionState from '@/assets/states-animations/Introduction.theatre-project-state.json'
import studio from "@theatre/studio"

export default class Animations {

  vector3D: any
  cameraParams: any

  constructor() {
  
    const nudgableNumber = (defaultValue) => t.number(defaultValue, { nudgeMultiplier: 0.01 });

    this.vector3D = {
      x: nudgableNumber(0),
      y: nudgableNumber(0),
      z: nudgableNumber(0)
    };

    this.cameraParams = {
      transforms: {
        position: this.vector3D,
        rotation: this.vector3D,
      },
      zoom: 1,
      fov: 50,
      target: {
        position: { x: 0, y: 2, z: 1 },
      },
    };

    studio.initialize()
    studio.ui.restore()

    if(window.location.pathname === "/studio") {
     // studio.initialize()

      // import('@theatre/studio').then(studio => {
      //   studio.default.initialize() 
      // });
     
      
    }
   
  }


  // gsap shit
  createTimeline() {
    const tl = gsap.timeline({ onUpdate: this.onUpdate })
    return tl;
  }




  start(camera, target) {



  //   const tl = gsap.timeline({ 
  //     onUpdate: ()=> {
  //      camera.lookAt(target)
  //   } 
  //  })


    // tl.to('.button-start', { y: -10, opacity: 0, duration: 0.4})
    // tl.to('canvas', { opacity: 1, duration: 0.8, ease: 'power4.inOut'})

    // tl.to(camera.position, { x: 12, y: 0.5, z: -6, ease: 'power2.inOut', duration: 5 })
    // tl.to(camera.position, { x: 11, y: 3, z: 8, ease: 'power2.out', duration: 10 }, 7)
    // tl.to(camera.position, { z: "-=5", ease: 'power2.out', duration: 4 }, 18)
    // tl.to(camera.position, { z: "+=5", ease: 'power2.out', duration: 4 }, 22)
    // tl.to(camera.position, { x: 12, y: 0.5, z: -6, ease: 'power2.out', duration: 4 }, 24)
    // tl.to(camera.position, { x: 10, y: 1, z: -3, ease: 'power2.out', duration: 4 }, 26)
    // //tl.to(camera.rotation, { x: 0.612, y: 1.41, z: 0.60,  ease: 'power4.inOut', duration: 4}) 
    // // tl.to(camera.quaternion, { x: 0.612, y: 1.41, z: 0.60, w: 0  ease: 'power4.inOut', duration: 4}) 
    // tl.to('.ui', { display: 'none'}, 2)

    

  }

  onUpdate() {
    
  }

  cameraMoveSong(audio_number, camera, target) {



  //   const tl = gsap.timeline({ 
  //     onUpdate: ()=> {
  //      camera.lookAt(target)
  //   } 
  //  })
   
    if(audio_number === 1) {
      
      // tl.to(camera.position, { z: "+=11",  y: "+=1", x: "-=3", ease: 'power2.inOut', duration: 5 }, 0)
      // tl.to(camera.position, { z: "-=11", y: "+=2",  x: "+=3", ease: 'power2.out', duration: 5 }, 5)
      // tl.to(camera.position, {  x: 7.7231, y: 1.294, z: -2.2, ease: 'power2.out', duration: 5}, 10)
      // tl.to(camera.position, {  z: "-=4.2", y: 1.2, ease: 'power2.out', duration: 5}, 15)
      // tl.to(camera.position, {  x:7.98, y: 1.981, z:1, ease: 'power2.out', duration: 3}, 20)

    }

    if(audio_number === 2) {
      // tl.to(camera.position, { x: 6.762, y: 1.2, z: 4.3,  ease: 'power2.inOut', duration: 4})
      // tl.to(camera.position, { x: 12, y: 4.3, z: 0.5,  ease: 'power2.inOut', duration: 12}, 4)
      // tl.to(camera.position, { x: 4.6, y: 1.2, z: 0.95,  ease: 'power2.inOut', duration: 4})      
    }
  }

  

  createProject(project_name, project_state?: ObjectType) {
   // Create a project for the animation
    let project;

    if(project_state) {
      project = getProject(project_name, project_state);
    } else {
      project = getProject(project_name);
     
    }

    return project;
    
  }

  createSheet(project, sheet_name, audio?) {
    // Create a sheet
    const sheet = project.sheet(sheet_name);

    if(audio) {
      this.attachAudio(sheet, audio)                                    
    }
    return sheet;
  }

  createIntroduction(camera) {
    const project = this.createProject('Introduction', { introductionState })
    // const sheet = this.createSheet(project, 'Camera Animation', '/sounds/initialisation.mp3')
    const sheet = this.createSheet(project, 'Camera Animation')
     
    this.createTheatreObject(sheet, "camera", camera.instance, this.cameraParams)
    this.playAnimations(project, sheet, 1)
  }


  createTheatreObject(sheet, object_name, mesh, object_properties) {

    const object = sheet.object(object_name, object_properties)

    this.attachOnValueChange(object, object_name, mesh)
  }

  attachOnValueChange(object, object_name, mesh) {
    

    object.onValuesChange((values) => {
     
      // position // rotation
      for (const [transform, value] of Object.entries(values.transforms)) {
        //@ts-ignore
        mesh[transform].set(value.x, value.y, value.z);
      }

      if(object_name === "camera")  {

        mesh.fov = values.fov
        mesh.zoom = values.zoom

        for (const [transform, value] of Object.entries(values.target)) {
           //@ts-ignore
          mesh.lookAt(value.x, value.y, value.z);
        }  

        mesh.updateProjectionMatrix();
      }
    })
  }


  attachAudio(sheet, source) {

    sheet.sequence.attachAudio({
      source: source
    }).then(() => {
       sheet.sequence.play({ iterationCount: 1})
    });
  
  }
  

  playAnimations(project, sheet, iterationCount: number) {
    project.ready.then(() => sheet.sequence.play({ iterationCount: iterationCount }))
  }
}
