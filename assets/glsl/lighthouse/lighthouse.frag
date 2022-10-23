precision mediump float;

varying float vDispl;
varying vec2 vUv;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

void main() {

	// gl_FragColor = vec4(vUv.xy, 1., 1. - vUv.y);
	// gl_FragColor = vec4(color, vUv.x);

	// float alpha_a = step(vUv.x, 0.5);

	float alpha = 0.;
	if(vUv.x < 0.25) {
		alpha = smoothstep(0., 0.25, vUv.x);
	} else if(vUv.x < 0.5) {
		alpha = 1. - smoothstep(0.25, 0.5, vUv.x);
	} else if(vUv.x < 0.75) {
		alpha = smoothstep(0.5, 0.75, vUv.x);
	} else {
		alpha = 1. - smoothstep(0.75, 1., vUv.x);
	}
	alpha *= vUv.y;
	vec3 color = mix(vec3(0.9255, 0.902, 0.7059), vec3(0.8667, 0.7098, 0.6392), alpha - 0.2);
	// alpha_a = step(.5,1. - vUv.x);
	// alpha_a = step(vUv.x, .25);
	// alpha_a = step(.75,vUv.x);
	gl_FragColor = vec4(color, alpha);

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