import {BloomEffect, BlendFunction,SelectiveBloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import useDebug from "@/composables/useDebug";


	
export default class PostProcess {
    composer: any
    scene: any
    renderer: any
    webgl: any
    camera: any
    params: any
    effect: any

    constructor({ scene }) {

        this.scene = scene;
        this.renderer = scene.renderer;
        this.webgl = scene.webgl;
        this.camera = scene.camera;
        this.composer = new EffectComposer(this.renderer)    
        this.params = {
            blendFunction: BlendFunction.ADD,
			mipmapBlur: true,
			luminanceThreshold: 0.5,
			luminanceSmoothing: 0.1,
			intensity: 0.92
        },
        
        this.init()
        this.tweak()
    }

    async init() {
          
        this.composer.addPass(new RenderPass(this.scene.instance, this.camera));

		this.effect = new SelectiveBloomEffect(this.scene, this.camera, {
			blendFunction: this.params.blendFunction,
			mipmapBlur:  this.params.mipmapBlur,
			luminanceThreshold: this.params.luminanceThreshold,
			luminanceSmoothing: this.params.luminanceSmoothing,
			intensity: this.params.intensity
		});

		this.effect.inverted = true;
		const effectPass = new EffectPass(this.camera, this.effect);
		this.composer.addPass(effectPass);
        this.composer.addPass(new EffectPass(this.camera, this.effect));
    }

    tweak() {
		const debug = useDebug()

		const default_page = debug.panel.addFolder({
			title: 'bloom',
			expanded: false,
		});

		default_page.addInput(this.params, 'intensity', { min: 0, max: 10 }).on('change', (ev) => {
            this.effect.intensity = ev.value;
        });

        default_page.addInput(this.params, 'luminanceThreshold', { min: 0, max: 10 }).on('change', (ev) => {
            this.effect.luminanceThreshold = ev.value;
        });

        default_page.addInput(this.params, 'luminanceSmoothing', { min: 0, max: 10 }).on('change', (ev) => {
            this.effect.luminanceSmoothing = ev.value;
        });

        default_page.addInput(this.params, 'mipmapBlur').on('change', (ev) => {
            this.effect.mipmapBlur = ev.value;
        });
		
	}



    render() {
        //this.composer.render(this.scene.instance, this.camera);
        // this.renderer.render(this.scene.instance, this.camera);
        this.composer.render();
    }

    resize(width, height) {
        this.composer.setSize(width, height);
    }
}