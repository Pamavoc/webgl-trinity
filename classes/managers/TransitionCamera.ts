import { Mesh, PlaneGeometry, ShaderMaterial } from "three";
import { lerp } from "three/src/math/MathUtils";
import cameraFrag from "@/assets/glsl/transitions/camera.frag";
import cameraVert from "@/assets/glsl/transitions/camera.vert";

class TransitionCamera {

  webgl: any
  scene: any
  emitter: any
  mesh: Mesh
  geometry:PlaneGeometry
  material: ShaderMaterial
  isCameraHidden: boolean

  constructor(args) {
    this.webgl = args.webgl
    this.scene = args.scene
    this.emitter = this.webgl.emitter
    this.isCameraHidden = false;

    this.init();

    this.emitter.on("hideCamera", () => (this.isCameraHidden = true));
    this.emitter.on("showCamera", () => (this.isCameraHidden = false));
  }

  init() {
    this.setTransitionCamera();
  }

  setTransitionCamera() {
    this.geometry = new PlaneGeometry(5, 5);
    this.material = new ShaderMaterial({
      vertexShader: cameraVert,
      fragmentShader: cameraFrag,
      uniforms: {
        uAlpha: { value: 0 },
      },
      transparent: true,
    });
    this.mesh = new Mesh(this.geometry, this.material);

    console.log(this.scene)

    this.scene.instance.add(this.mesh);
  }

  update() {
    this.material.uniforms.uAlpha.value = lerp(
      this.material.uniforms.uAlpha.value,
      this.isCameraHidden ? 1 : 0,
      0.3
    );
  }
}

export default TransitionCamera;