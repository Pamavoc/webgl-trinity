precision highp float;

varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying float vElevation;

// vec3 uDepthColor = vec3(0.07, 0.08, 0.48);
// vec3 uSurfaceColor = vec3(0.24, 0.47, 0.77);
// float uColorOffset = 1.;
// float uColorMultiplier = 1.;

void main() {
	float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
	vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

	gl_FragColor = vec4(color, 1.0);

  #ifdef USE_FOG
    #ifdef USE_LOGDEPTHBUF_EXT
	float depth = gl_FragDepthEXT / gl_FragCoord.w;
    #else
	float depth = gl_FragCoord.z / gl_FragCoord.w;
    #endif
	float fogFactor = smoothstep(fogNear, fogFar, depth);
	gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
  #endif
}

// varying vec2 vUv;
// uniform sampler2D texture;
// uniform vec3 fogColor;
// uniform float fogNear;
// uniform float fogFar;
// void main() {