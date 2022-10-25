import { WebGLRenderer, Scene, sRGBEncoding } from 'three';

export default class Renderer {
  scene: Scene;
  instance: WebGLRenderer;

  constructor(width, height) {
    const $canvas = document.querySelector('#canvas');

    this.instance = new WebGLRenderer({
      canvas: $canvas,
      antialias: false,
      powerPreference: 'high-performance',
      //outputEncoding: sRGBEncoding,
      stencil: false,
      depth: false
    });
    this.instance.setSize(width, height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 1, 2));

  }
}
