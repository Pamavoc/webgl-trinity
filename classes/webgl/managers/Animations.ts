import { getProject } from '@theatre/core';
import studio from '@theatre/studio';

export default class Animations {
  constructor() {
   // studio.initialize();
    console.log(studio);

    const project = this.createProject('THREE.js x Theatre.js');
    const sheet = this.createSheet(project, 'Animated scene');
  }

  createProject(project_name) {
    // Create a project for the animation
    const project = getProject(project_name);

    return project;
  }

  createSheet(project, sheet_name) {
    // Create a sheet
    const sheet = project.sheet(sheet_name);
  }
}
