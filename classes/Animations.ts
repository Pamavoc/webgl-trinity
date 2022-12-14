import { getProject, types as t } from '@theatre/core'
import { ObjectType } from '@/classes/interfaces/ObjectType';
import introductionState from '@/assets/states-animations/Introduction.theatre-project-state.json'
import microState from '@/assets/states-animations/Micro-anim.theatre-project-state.json'
import studio from "@theatre/studio"

export default class Animations {

  vector3D: any
  cameraParams: any
  studio: any
  canvas: any
  ui: any
  uiParams: any
  btnParams: any
  anims: Array<any>

  constructor() {
  
    this.anims = []
    this.studio = studio
    this.canvas = document.querySelector(".container-canvas canvas")
    this.ui = document.querySelector(".ui")
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


    this.btnParams = {
      opacity: t.number(1, { range: [0, 1] }),
      width: t.number(100, { range: [0, 100] }),
      transform: { x:0, y:0 }
    }

    this.uiParams = {
      opacity: t.number(1, { range: [0, 1] }),
      width: t.number(100, { range: [0, 100] }),
   }

    this.studio.initialize()

    if(window.location.pathname === '/studio') {
      this.studio.ui.restore()
    } else {
      this.studio.ui.hide()
    }
   


  }

  createAnimations(camera) {
    this.createStartAnim()
    this.createIntroduction(camera)
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

  createProjectAndSheet(project_name: String, sheet_name: String, project_state?: ObjectType, audio?) {

    let project;
    let sheet;

    if (project_state) {
      project = this.createProject(project_name, project_state)

    } else {
      project = this.createProject(project_name)
    }

    if (audio) {
      sheet = this.createSheet(project, sheet_name, audio)

    } else {
      sheet = this.createSheet(project, sheet_name)
    }

    this.anims.push({ project_name, project, sheet })

    return { project, sheet }
  }


  createStartAnim() {
    //const project = this.createProject('Micro-anim')
    //const sheet = this.createSheet(project, 'Button Animation')
    const { sheet } = this.createProjectAndSheet('Micro-anim', 'Button Animation', { state: microState })


    this.createTheatreObject(
      {
        sheet: sheet,
        objects: [
          {
            name: "button p",
            type: "2d", // dom 
            properties: this.btnParams,
            real: document.querySelector('.button-start p'),
          },
          {
            name: "border-bottom",
            type: "2d", // dom 
            properties: this.btnParams,
            real: document.querySelector('.border-bottom'),
          },
          {
            name: "border-top",
            type: "2d", // dom 
            properties: this.btnParams,
            real: document.querySelector('.border-top'),
          },
        ],
    })

  
  }

  createIntroduction(camera) {
   // const project = this.createProject('Introduction', { state:  introductionState })
    // const sheet = this.createSheet(project, 'Camera Animation', '/sounds/initialisation.mp3')
   // const sheet = this.createSheet(project, 'Camera Animation')

    const { sheet } = this.createProjectAndSheet('Introduction', 'Camera Animation', { state:  introductionState })
    
    this.createTheatreObject(
      {
        sheet: sheet,
        objects: [
          {
            name: "camera", // theatre element (just a name)
            type: "3d", // dom or 3d (type of element)
            properties: this.cameraParams, // properties to create the sheet in theatre 
            real: camera.instance, // real element to link with the properties and name
          },
          {
            name: "ui",
            type: "2d", // dom 
            properties: this.uiParams,
            real: this.ui
          },
          {
            name: "canvas",
            type: "2d", // dom 
            properties: this.uiParams,
            real: this.canvas
          },
        ],  
      }
    )

    //this.playAnimations(project, sheet, 1)
  }

  play(name, iterationCount) {
    const { project, sheet } = this.anims.find(anim => anim.project_name === name)
    project.ready.then(() => sheet.sequence.play({ iterationCount: iterationCount }))
  }
  


  createTheatreObject({sheet, objects}) {

   for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const object_sheet = sheet.object(object.name, object.properties)  
    this.attachOnValueChange(object_sheet, object.name, object.real, object.type)
   }
    
  }

  attachOnValueChange(object, object_name, real_object, type) {
    
    object.onValuesChange((values) => {

      if (type == "2d") {

        for (const [property, value] of Object.entries(values)) {    

          if(property == 'opacity') {
            real_object.style[property] = `${value}`;
          
          } else if(property == 'transform') {
            //@ts-ignore
            real_object.style.transform =  `translate(${value.x}px, ${value.y}px)`

          } else {
            real_object.style[property] = `${value}%`;
          }
            
        }

      } else if (type == "3d") {

        
        // position // rotation
        for (const [transform, value] of Object.entries(values.transforms)) {
          //@ts-ignore
          real_object[transform].set(value.x, value.y, value.z);
        }


        if (object_name === "camera") {
          real_object.fov = values.fov;
          real_object.zoom = values.zoom;

          for (const [transform, value] of Object.entries(values.target)) {
            //@ts-ignore
            real_object.lookAt(value.x, value.y, value.z);
          }

          real_object.updateProjectionMatrix();
        }
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
