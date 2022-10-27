//import { getProject } from '@theatre/core';
//import studio from '@theatre/studio';
import gsap from 'gsap'


export default class Animations {
  constructor() {

  

   // studio.initialize();
   // console.log(studio);

    //const project = this.createProject('THREE.js x Theatre.js');
    //const sheet = this.createSheet(project, 'Animated scene');
  }

  createTimeline() {
    const tl = gsap.timeline({ onUpdate: this.onUpdate })
    return tl;
  }

  start(camera, target) {
    const tl = gsap.timeline({ 
      onUpdate: ()=> {
       camera.lookAt(target)
    } 
   })


    tl.to('.button-start', { y: -10, opacity: 0, duration: 0.4})
    tl.to('canvas', { opacity: 1, duration: 0.8, ease: 'power4.inOut'})

    tl.to(camera.position, { x: 12, y: 0.5, z: -6, ease: 'power2.inOut', duration: 5 })
    tl.to(camera.position, { x: 11, y: 3, z: 8, ease: 'power2.out', duration: 10 }, 7)
    tl.to(camera.position, { z: "-=5", ease: 'power2.out', duration: 4 }, 18)
    tl.to(camera.position, { z: "+=5", ease: 'power2.out', duration: 4 }, 22)
    tl.to(camera.position, { x: 12, y: 0.5, z: -6, ease: 'power2.out', duration: 4 }, 24)
    tl.to(camera.position, { x: 10, y: 1, z: -3, ease: 'power2.out', duration: 4 }, 26)
    //tl.to(camera.rotation, { x: 0.612, y: 1.41, z: 0.60,  ease: 'power4.inOut', duration: 4}) 
    // tl.to(camera.quaternion, { x: 0.612, y: 1.41, z: 0.60, w: 0  ease: 'power4.inOut', duration: 4}) 
    tl.to('.ui', { display: 'none'}, 2)

    

  }

  onUpdate() {
    
  }

  cameraMoveSong(audio_number, camera, target) {

    const tl = gsap.timeline({ 
      onUpdate: ()=> {
       camera.lookAt(target)
    } 
   })
   
    if(audio_number === 1) {
      
      tl.to(camera.position, { z: "+=11",  y: "+=1", x: "-=3", ease: 'power2.inOut', duration: 5 }, 0)
      tl.to(camera.position, { z: "-=11", y: "+=2",  x: "+=3", ease: 'power2.out', duration: 5 }, 5)
      tl.to(camera.position, {  x: 7.7231, y: 1.294, z: -2.2, ease: 'power2.out', duration: 5}, 10)
      tl.to(camera.position, {  z: "-=4.2", y: 1.2, ease: 'power2.out', duration: 5}, 15)
      tl.to(camera.position, {  x:7.98, y: 1.981, z:1, ease: 'power2.out', duration: 3}, 20)

    }

    if(audio_number === 2) {
      tl.to(camera.position, { x: 6.762, y: 1.2, z: 4.3,  ease: 'power2.inOut', duration: 4})
      tl.to(camera.position, { x: 12, y: 3.3, z: 0.5,  ease: 'power2.inOut', duration: 12}, 4)
      // tl.to(camera.position, { x: 4.6, y: 1.2, z: 0.95,  ease: 'power2.inOut', duration: 4})      
    }
  }

  

  createProject(project_name) {
    // Create a project for the animation
   // const project = getProject(project_name);

    //return project;
  }

  createSheet(project, sheet_name) {
    // Create a sheet
    //const sheet = project.sheet(sheet_name);
  }
}
