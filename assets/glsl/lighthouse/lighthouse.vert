uniform float uTime;

varying float vDispl;
varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

void main() {

	vec3 pos = position;
	vUv = uv;

	float displ = noise(vec3(pos.xz * 10., uTime * 0.1));

	// pos.y += 0.1 * displ;


	vDispl = displ;


	vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.);
	gl_Position = projectionMatrix * modelViewPosition;
}