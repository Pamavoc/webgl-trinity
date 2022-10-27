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
    const tl = gsap.timeline()
    return tl;
  }

  start(camera) {
    const tl = this.createTimeline()
    tl.to('.button-start', { y: -10, opacity: 0, duration: 0.4})
    tl.to('canvas', { opacity: 1, duration: 0.8, ease: 'power4.inOut'})
    tl.to(camera.position, { x: 12, y: 4.9, z: -3, ease: 'power4.inOut', duration: 4 })
    tl.to(camera.rotation, { x: 0.612, y: 1.41, z: 0.60,  ease: 'power4.inOut', duration: 4}) 
    tl.to('.ui', { display: 'none'}, 2)

  }

  cameraMove() {
   
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
