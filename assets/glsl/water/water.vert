uniform float uTime;

uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;
uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;

varying vec2 vUv;
varying float vElevation;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

void main() {

	vec3 pos = position;
	vUv = pos.xy;

	vec2 uv = pos.xy;
	uv *= 0.1;

	// float uBigWavesElevation = 1.;
	// vec2 uBigWavesFrequency = vec2(1., 1.);
	// float uBigWavesSpeed = 1.;
	// float uSmallWavesElevation = 1.;
	// float uSmallWavesFrequency = 1.;
	// float uSmallWavesSpeed = 1.;
	// const float uSmallIterations = 5.;

	// pos.y += noise(vec3(pos.xz * 1000., uTime * 0.01)) * 0.002;

	// pos.y += 0.1 * displ;

	float elevation = sin(uv.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
		sin(uv.y * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
		uBigWavesElevation;
	for(float i = 1.0; i <= uSmallIterations; i++) {
		elevation -= abs(noise(vec3(uv.xy * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
	}

	vElevation = elevation;

	pos.z += elevation * 0.1;

	vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.);
	gl_Position = projectionMatrix * modelViewPosition;
}

// void main() {
//     // Elevation

// 	modelPosition.y += elevation;
// 	vec4 viewPosition = viewMatrix * modelPosition;
// 	vec4 projectedPosition = projectionMatrix * viewPosition;
// 	gl_Position = projectedPosition;
// 	vElevation = elevation;
// }`