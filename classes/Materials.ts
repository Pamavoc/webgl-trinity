import * as THREE from 'three';
import useDebug from "@/composables/useDebug";

import cableFrag from '@/assets/glsl/cable/cable.frag';
import cableVert from '@/assets/glsl/cable/cable.vert';

import screenFrag from '@/assets/glsl/screen/screen.frag';
import screenFrag2 from '@/assets/glsl/screen/screen2.frag';
import screenFrag3 from '@/assets/glsl/screen/screen3.frag';
import screenVert from '@/assets/glsl/screen/screen.vert';

import trinityFrag from '@/assets/glsl/trinity/trinity.frag';
import trinityVert from '@/assets/glsl/trinity/trinity.vert';

import cubeFrag from '@/assets/glsl/cube/cube.frag';
import cubeVert from '@/assets/glsl/cube/cube.vert';


export default class Materials {
	
	defaultMaterial: any
	defaultGreenMaterial: any
	cableMaterial: any
	cubeMaterial2: any
	cubeMaterial: any
	screenMaterial: any
	screenMaterial2: any
	solMaterial: any
	trinityMaterial: any
	webgl: any
	texture: any
	texture2: any
	video: any
	video2: any
	audio_number: number

	constructor(args) {

		this.webgl = args.webgl
		this.audio_number = -1;

		this.createVideo()
		this.create()
		
		this.webgl.scene.changeFog('black')
    	this.changeDefault('black')
    
	}

	create() {
		


		// video
		this.cubeMaterial2 = new THREE.RawShaderMaterial( {
			uniforms: {
				uTime: { value: 0 },
				texture: { type: "t", value: this.texture2},
			},
			fragmentShader: cubeFrag,
			vertexShader: cubeVert,
		});

		// normal
		this.cubeMaterial = new THREE.RawShaderMaterial( {
			uniforms: {
				uTime: { value: 0 },
				uSoundNumber: { value: 0 },
				texture: { type: "t", value: this.texture},
			},
			fragmentShader: cubeFrag,
			vertexShader: cubeVert,
		} );

		this.defaultGreenMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color(0x1ECA9A) })

		this.screenMaterial = new THREE.RawShaderMaterial( {
			
			uniforms: {
				uTime: { value: 0 },
				uColor: { value: { r: 30/255, g: 202/255, b:154/255 } },
				uColor2: { value: { r: 0, g: 0, b: 0} },
				uColor3: { value: { r: 191/255, g: 157/255, b: 90/255 }},
				uAlpha: { value:1 },
				uSound: { value: 0 },
				uSound2: { value: 0 },
				uSound3: { value: 0 },
				uSound4: { value: 0 },
				uSound5: { value: 0 },
				uHeight: { value: 0},
				uSoundNumber: { value: this.audio_number },
				uLineNumberY: { value: 84.93 },
				uLineStrength: { value: 0.11 },
				uAverage: { value:0}
			},
			transparent: true,
			fragmentShader: screenFrag,
			vertexShader: screenVert,
		} );

		this.screenMaterial2 = new THREE.RawShaderMaterial( {
			
			uniforms: {
				uTime: { value: 0 },
				uColor: { value: { r: 30/255, g: 202/255, b:154/255 } },
				uColor2: { value: { r: 0, g: 0, b: 0} },
				uColor3: { value: { r: 191/255, g: 157/255, b: 90/255 }},
				uAlpha: { value:1 },
				uSound: { value: 0 },
				uSound2: { value: 0 },
				uSound3: { value: 0 },
				uSound4: { value: 0 },
				uSound5: { value: 0 },
				uHeight: { value: 0},
				uSoundNumber: { value: this.audio_number },
				uLineNumberY: { value: 84.93 },
				uLineStrength: { value: 0.11 },
				uAverage: { value:0}
			},
			transparent: true,
			fragmentShader: screenFrag2,
			vertexShader: screenVert,
		} );

		this.cableMaterial = new THREE.RawShaderMaterial( {
			uniforms: {
				uTime: { value: 0 },
				uColor: { value: new THREE.Color(0xFFFFFF) },
				uColor2:{ value: { r: 30/255, g: 202/255, b:154/255 } },
				uColor3: { value: { r: 8/255, g: 190/255, b:97/255 } },
				uAlpha: { value: 0 },
				uHeight: { value: 0 },
				uSoundNumber: { value: this.audio_number },
				uAverage: { value: 0 }
			},
			fragmentShader: cableFrag,
			vertexShader: cableVert,
		} );

		this.trinityMaterial = new THREE.RawShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uColor: { value: new THREE.Color(0x1ECA9A) },
				uAlpha: { value: 1},
				uSoundNumber: { value: this.audio_number },
			},
			fragmentShader: trinityFrag,
			vertexShader: trinityVert,
			
		})


		this.defaultMaterial = new THREE.MeshStandardMaterial({
			color: new THREE.Color(0x182b989a),
			emissive: new THREE.Color(0x0909090),
		})

		this.solMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color(0x2B2B2B), roughness: 1})

		const target = new THREE.Vector3(0, 1, 0)

		this.webgl.emitter.on("song_start", (audio_number)=> {

			this.audio_number = audio_number
			console.log(`AUDIO NUMBER : ${audio_number}`)
			//console.log("intro end")
	  
		
			if(this.audio_number === 0) {
				this.trinityMaterial.uniforms.uColor.value = { r: 30/255, g: 202/255, b:154/255 };
			}
		
			if(this.audio_number === 1) {
				
				this.changeMaterial()
				// this.webgl.animations.cameraMoveSong(this.audio_number, this.webgl.camera.instance, target)
				// this.webgl.animations.cam
			}

			if(this.audio_number === 2) {
				
				// this.webgl.animations.cameraMoveSong(this.audio_number, this.webgl.camera.instance, target)

				this.screenMaterial.uniforms.uColor.value = {r: 0.99, g: 0.56, b: 0.04}; // {r: 0.95, g: 0.38, b: 0.07}
				this.screenMaterial.uniforms.uAlpha.value = 0.8

				this.screenMaterial2.uniforms.uColor.value = {r: 0.95, g: 0.38, b: 0.07}
				this.screenMaterial2.uniforms.uAlpha.value = 0.8


				// this.webgl.animations.cameraMoveSong(this.audio_number, this.webgl.camera.instance, target)

				this.trinityMaterial.uniforms.uColor.value = { r: 191/255, g: 96/255, b: 90/255 };
				this.cableMaterial.uniforms.uColor2.value = {r: 0.99, g: 0.56, b: 0.04}
				this.cableMaterial.uniforms.uColor.value = {r: 0.95, g: 0.38, b: 0.07} //{r: 0.95, g: 0.38, b: 0.07}
				this.cableMaterial.uniforms.uAlpha.value = 0.4
			}

		


			this.cableMaterial.uniforms.uSoundNumber.value = audio_number
			this.screenMaterial.uniforms.uSoundNumber.value = audio_number
			this.screenMaterial2.uniforms.uSoundNumber.value = audio_number
			this.trinityMaterial.uniforms.uSoundNumber.value = audio_number
			
		})

	}

	createVideo() {
		this.video = document.createElement('video')
		this.video2 = document.createElement('video')
		

		this.video.src = '/1.mp4'
		this.video2.src = '/2.mp4'
		// video.autoplay = true


		this.video.loop = true
		this.video.muted = true
		this.video2.loop = true
		this.video2.muted = true

		// document.body.appendChild(video)
		this.texture = new THREE.VideoTexture(this.video);
		this.texture.minFilter = THREE.LinearFilter;
		this.texture.magFilter = THREE.LinearFilter;
		this.texture.format = THREE.RGBAFormat;
		
		this.texture2 = new THREE.VideoTexture(this.video2)
		this.texture2.minFilter = THREE.LinearFilter;
		this.texture2.magFilter = THREE.LinearFilter;
		this.texture2.format = THREE.RGBAFormat
	}

	changeMaterial() {
		this.webgl.scene.instance.traverse(child => {
			if(/cube-face/ig.test(child.name)) {
				child.material = this.screenMaterial
			}

			if(/screen/ig.test(child.name)) {
				child.material = this.screenMaterial
			}

			if(child.name === "screen-1" || child.name === "screen-2") {
				child.material = this.screenMaterial2
			}
		})
		
	}

	playVideos() {
		this.video.play()
		this.video2.play()
	}

	tweak() {
		const debug = useDebug()

		const default_page = debug.panel.addFolder({
			title: 'defaultMaterial',
			expanded: false,
		});

		const screen_page = debug.panel.addFolder({
			title: 'screenMaterial',
			expanded: false,
		});
		const cable_page = debug.panel.addFolder({
			title: 'cableMaterial',
			expanded: false,
		});
		

		const default_params = {
			color: this.defaultMaterial.color.getHex(),
			emissive: this.defaultMaterial.emissive.getHex(),
		}

		const cable_params = {
			color1: this.cableMaterial.uniforms.uColor.value,
			color2: this.cableMaterial.uniforms.uColor2.value,
			alpha:  this.cableMaterial.uniforms.uAlpha.value,
			// emissive: this.waterMaterial.emissive.getHex(),
		}

		const screen_params = {
			color1: this.screenMaterial.uniforms.uColor.value,
			alpha: this.screenMaterial.uniforms.uAlpha.value,
			color2: this.screenMaterial.uniforms.uColor2.value,
			lineStrength: this.screenMaterial.uniforms.uLineStrength.value,
			uLineNumberY: this.screenMaterial.uniforms.uLineNumberY.value
		}

		const color_options = {
			view: 'color',
			color: { 
				alpha: true, type:"float"
			},
		}


		default_page.addInput(default_params, 'color', color_options).on('change', () => {
			this.defaultMaterial.color.setHex(default_params.color);
		})

		default_page.addInput(default_params, 'emissive', color_options).on('change', () => {
			this.defaultMaterial.emissive.setHex(default_params.emissive);
		})


		cable_page.addInput(cable_params, 'color1', color_options).on('change', () => {
			this.cableMaterial.uniforms.uColor.value = cable_params.color1;
		});

		cable_page.addInput(cable_params, 'color2', color_options).on('change', () => {
			this.cableMaterial.uniforms.uColor2.value = cable_params.color2;
		});

		cable_page.addInput(screen_params, 'alpha', {min: 0, max: 1}).on('change', (ev) => {
			console.log(ev.value)
			this.cableMaterial.uniforms.uAlpha.value = cable_params.alpha;
		});

		screen_page.addInput(screen_params, 'color1', color_options).on('change', (ev) => {
			console.log(ev.value)
			this.screenMaterial.uniforms.uColor.value = screen_params.color1;
		});


		screen_page.addInput(screen_params, 'alpha', {min: 0, max: 1}).on('change', (ev) => {
			console.log(ev.value)
			this.screenMaterial.uniforms.uAlpha.value = screen_params.alpha;
		});
		

		screen_page.addInput(screen_params, 'lineStrength', { min: 0, max: 5 }).on('change', (ev) => {
			this.screenMaterial.uniforms.uLineStrength.value = ev.value
		});

		screen_page.addInput(screen_params, 'uLineNumberY', { min: 1, max: 100 }).on('change', (ev) => {
			this.screenMaterial.uniforms.uLineNumberY.value = ev.value
		});
	}

	update(time: number) {

		if(this.webgl.audio_started) {
			this.screenMaterial.uniforms.uSound.value = this.webgl.audio_manager.values[0]
			this.screenMaterial.uniforms.uSound2.value = this.webgl.audio_manager.values[1]
			this.screenMaterial.uniforms.uSound3.value  = this.webgl.audio_manager.values[2]
			this.screenMaterial.uniforms.uSound4.value  = this.webgl.audio_manager.values[3]
			this.screenMaterial.uniforms.uSound5.value  = this.webgl.audio_manager.values[4]


			this.screenMaterial2.uniforms.uSound2.value = this.webgl.audio_manager.values[1]
			this.screenMaterial2.uniforms.uHeight.value = this.webgl.audio_manager.volume
		
			this.screenMaterial.uniforms.uHeight.value = this.webgl.audio_manager.volume

		}
		
		
		if(this.webgl.audio_started && this.audio_number > 0) {
			this.cableMaterial.uniforms.uHeight.value =  this.webgl.audio_manager.values[4]
		}

		this.cableMaterial.uniforms.uTime.value = time;
		this.screenMaterial.uniforms.uTime.value = time;
		this.screenMaterial2.uniforms.uTime.value = time;
		this.trinityMaterial.uniforms.uTime.value = time;

	}


	changeDefault(newColor: string) {

		newColor ??= 'default';

		const colors = {
			default: {
				color: 0x69665c,
				emissive: 0x8c826b,
			},
			black: {
				color: 0x080808,
				emissive: 0x1E1E1E
			},
			yellow: {
				color: 0xa2a2a2,
				emissive: 0x997218
			},
			green: {
				color: 0xb5b5b5,
				emissive: 0x307540
			},
			brown: {
				color: 0x756b60,
				emissive: 0x4f3822
			}
		}


		this.defaultMaterial.color.setHex(colors[newColor].color);
		this.defaultMaterial.emissive.setHex(colors[newColor].emissive);

	}
}