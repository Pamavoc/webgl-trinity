// uniform float time;


float N(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float smoothNoise(vec2 ip) {
	vec2 lv = fract(ip);
	vec2 id = floor(ip);

	lv = lv * lv * (3. -2. * lv);
	float bl = N(id);
	float br = N(id + vec2(1, 0));
	float b = mix(bl, br, lv.x);

	float tl = N(id + vec2(0, 1));
	float tr = N(id + vec2(1, 1));
	float t = mix(tl, tr, lv.x);

	return mix(b, t, lv.y);
}

// void main() {
// 	// transformed = transformed + offset;
// 	// float t = time * 1.4;

// 	// vec4 movPosition = vec4(position, 1.0);
// 	// #ifdef USE_INSTANCING
// 	// movPosition = instanceMatrix * movPosition;
// 	// #endif

// 	vec3 pos = position;

// 	float noise = smoothNoise(pos.xy * 0.3 + vec2(0., time));
// 	noise = pow(noise * 0.9, 2.) * 2.;

// 	float dispPower = .6 - cos(uv.x * 1.1416);

// 	float displacement = noise / 0.8 * (dispPower * .12);
// 	pos.xz -= displacement;

// 	vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.) ;
// 	gl_Position = projectionMatrix * modelViewPosition;
// }

// varying vec3 vLightFront;
// varying vec3 vIndirectFront;
// #ifdef DOUBLE_SIDED
// varying vec3 vLightBack;
// varying vec3 vIndirectBack;
// #endif
// #include <common>
// #include <uv_pars_vertex>
// #include <uv2_pars_vertex>
// #include <envmap_pars_vertex>
// #include <bsdfs>
// #include <lights_pars_begin>
// #include <color_pars_vertex>
// #include <fog_pars_vertex>
// #include <morphtarget_pars_vertex>
// #include <skinning_pars_vertex>
// #include <shadowmap_pars_vertex>
// #include <logdepthbuf_pars_vertex>
// #include <clipping_planes_pars_vertex>
// void main() {
// 	#include <uv_vertex>
// 	#include <uv2_vertex>
// 	#include <color_vertex>
// 	#include <beginnormal_vertex>
// 	#include <morphnormal_vertex>
// 	#include <skinbase_vertex>
// 	#include <skinnormal_vertex>
// 	#include <defaultnormal_vertex>
// 	#include <begin_vertex>
// 	#include <morphtarget_vertex>
// 	#include <skinning_vertex>
// 	#include <project_vertex>
// 	#include <logdepthbuf_vertex>
// 	#include <clipping_planes_vertex>
// 	#include <worldpos_vertex>
// 	#include <envmap_vertex>
// 	#include <lights_lambert_vertex>
// 	#include <shadowmap_vertex>
// 	#include <fog_vertex>
// }
// WebGL.ts : 92