import * as THREE from 'three';
import useDebug from "@/composables/useDebug";

import treeVertex from '@/assets/glsl/trees/treeVert';
import waterFrag from '@/assets/glsl/water/water.frag';
import waterVert from '@/assets/glsl/water/water.vert';

export default class Materials {
	treeMaterial: any
	defaultMaterial: any
	groundMaterial: any
	waterMaterial: any
	fieldMaterial: any
	webgl: any

	constructor(args) {

		this.webgl = args.webgl

		this.create()
		this.tweak()

		this.webgl.scene.changeFog('light_blue')
    this.changeField('brown')
    this.changeGround('default')
    this.changeTree('brown')

	}

	create() {

		// material pour animer les arbres
		this.treeMaterial = new THREE.MeshPhongMaterial({
			color: 0x45752a,
			shininess: 0,
			emissive: 0x193920,
			transparent: true,
			side: THREE.DoubleSide,
		});

		this.treeMaterial.onBeforeCompile = (shader) => {
			shader.uniforms.uTime = { value: 0 };
			shader.vertexShader = treeVertex;
			this.treeMaterial.userData.shader = shader;
		}

		this.groundMaterial = new THREE.MeshPhongMaterial({
			color: 0x1c1a13,
			shininess: 0,
			emissive: 0xa89e89,
			transparent: true,
			side: THREE.DoubleSide,
		});
		this.fieldMaterial = new THREE.MeshPhongMaterial({
			color: 0x69665c,
			shininess: 0,
			emissive: 0x8c826b,
			transparent: true,
			side: THREE.DoubleSide,
		});

		//feilddefaults
		// color: 0x69665c,
		// emissive: 0x8c826b,

		//green
		// color: 0x69665c,
		//emissive: 0x547c51

		//yellow
		// color: 0x958a4b
		// emissive: 0x92853b


		this.waterMaterial = new THREE.ShaderMaterial({
			fragmentShader: waterFrag,
			vertexShader: waterVert,
			transparent: true,
			uniforms:
			{
				uBigWavesElevation: { value: 0.2 },
				uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
				uBigWavesSpeed: { value: 0.75 },
				uDepthColor: { value: new THREE.Color(0xc3cfcc) },
				uSurfaceColor: { value: new THREE.Color(0xa5bac5) },
				uColorOffset: { value: 0.08 },
				uColorMultiplier: { value: 5 },
				uSmallWavesElevation: { value: 0.15 },
				uSmallWavesFrequency: { value: 3 },
				uSmallWavesSpeed: { value: 0.2 },
				uSmallIterations: { value: 4 },
				uTime: { value: 0 },

				fogColor: { type: "c", value: this.webgl.scene.instance.fog.color },
				fogNear: { type: "f", value: this.webgl.scene.instance.fog.near },
				fogFar: { type: "f", value: this.webgl.scene.instance.fog.far },

			},
			fog: true
		});

		this.defaultMaterial = new THREE.MeshPhongMaterial({
			color: 0x9c9478,
			shininess: 0,
			emissive: new THREE.Color("hsl(0, 0%, 30%)"),
			transparent: true,
			side: THREE.DoubleSide,
			// emissive: 0xfff,
		})
	}

	tweak() {
		const debug = useDebug()

		const tree_page = debug.panel.addFolder({
			title: 'treeMaterial',
			expanded: false,
		});
		const default_page = debug.panel.addFolder({
			title: 'defaultMaterial',
			expanded: false,
		});
		const water_page = debug.panel.addFolder({
			title: 'waterMaterial',
			expanded: false,
		});
		const ground_page = debug.panel.addFolder({
			title: 'groundMaterial',
			expanded: false,
		});
		const field_page = debug.panel.addFolder({
			title: 'fieldMaterial',
			expanded: false,
		});

		const tree_params = {
			color: this.treeMaterial.color.getHex(),
			emissive: this.treeMaterial.emissive.getHex(),
		}

		const default_params = {
			color: this.defaultMaterial.color.getHex(),
			emissive: this.defaultMaterial.emissive.getHex(),
		}

		const water_params = {
			color1: this.waterMaterial.uniforms.uDepthColor.value.getHex(),
			color2: this.waterMaterial.uniforms.uSurfaceColor.value.getHex(),
			// emissive: this.waterMaterial.emissive.getHex(),
		}

		const ground_params = {
			color: this.groundMaterial.color.getHex(),
			emissive: this.groundMaterial.emissive.getHex(),
		}
		const field_params = {
			color: this.fieldMaterial.color.getHex(),
			emissive: this.fieldMaterial.emissive.getHex(),
		}

		const color_options = {
			view: 'color',
			color: { alpha: true },
		}

		tree_page.addInput(tree_params, 'color', color_options).on('change', () => {
			this.treeMaterial.color.setHex(tree_params.color);
		});
		tree_page.addInput(tree_params, 'emissive', color_options).on('change', () => {
			this.treeMaterial.emissive.setHex(tree_params.emissive);
		})

		default_page.addInput(default_params, 'color', color_options).on('change', () => {
			this.defaultMaterial.color.setHex(default_params.color);
		})

		default_page.addInput(default_params, 'emissive', color_options).on('change', () => {
			this.defaultMaterial.emissive.setHex(default_params.emissive);
		})

		water_page.addInput(water_params, 'color1', color_options).on('change', () => {
			this.waterMaterial.uniforms.uDepthColor.value.setHex(water_params.color1);
		});

		water_page.addInput(water_params, 'color2', color_options).on('change', () => {
			this.waterMaterial.uniforms.uSurfaceColor.value.setHex(water_params.color2);
		});

		// water_page.addInput(water_params, 'color', color_options).on('change', () => {
		//   this.waterMaterial.color.setHex(water_params.color);
		// })

		// water_page.addInput(water_params, 'emissive', color_options).on('change', () => {
		//   this.waterMaterial.emissive.setHex(water_params.emissive);
		// })

		ground_page.addInput(ground_params, 'color', color_options).on('change', () => {
			this.groundMaterial.color.setHex(ground_params.color);
		})

		ground_page.addInput(ground_params, 'emissive', color_options).on('change', () => {
			this.groundMaterial.emissive.setHex(ground_params.emissive);
		})
		field_page.addInput(field_params, 'color', color_options).on('change', () => {
			this.fieldMaterial.color.setHex(field_params.color);
		})

		field_page.addInput(field_params, 'emissive', color_options).on('change', () => {
			this.fieldMaterial.emissive.setHex(field_params.emissive);
		})
	}

	update(time: number) {

		const treeShader = this.treeMaterial.userData.shader;
		if (treeShader) {
			treeShader.uniforms.uTime.value = time;
		}




		this.waterMaterial.uniforms.uTime.value = time * 0.8;

	}


	changeField(newColor: string) {

		newColor ??= 'default';

		const colors = {
			default: {
				color: 0x69665c,
				emissive: 0x8c826b,
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


		this.fieldMaterial.color.setHex(colors[newColor].color);
		this.fieldMaterial.emissive.setHex(colors[newColor].emissive);

	}

	changeTree(newColor: string) {

		newColor ??= 'default';

		const colors = {
			default: {
				color: 0x45752a,
				emissive: 0x344936,
			},
			yellow: {
				color: 0x957733,
				emissive: 0x37391e,
			},
			orange: {
				color: 0xeb6316,
				emissive: 0x49360d,
			},
			brown: {
				color: 0x2c2319,
				emissive: 0x493711,
			},
		}

		this.treeMaterial.color.setHex(colors[newColor].color);
		this.treeMaterial.emissive.setHex(colors[newColor].emissive);
	}

	changeGround(newColor: string) {

		newColor ??= 'default';

		const colors = {
			default: {
				color: 0x1c1a13,
				emissive: 0xa89e89,
			},
			green: {
				color: 0x4c4736,
				emissive: 0x658c5a,
			},
			yellow: {
				color: 0x2f2f2f,
				emissive: 0xa89560,
			},
			brown: {
				color: 0x1c1a13,
				emissive: 0x7f735a,
			},
		}

		this.groundMaterial.color.setHex(colors[newColor].color);
		this.groundMaterial.emissive.setHex(colors[newColor].emissive);
	}
}