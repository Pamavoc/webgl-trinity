export default `
#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

uniform float uTime;

float rand2(vec2 co) {
	return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float smoothNoise(vec2 ip) {
	vec2 lv = fract(ip);
	vec2 id = floor(ip);

	lv = lv * lv * (3. -2. * lv);
	float bl = rand(id);
	float br = rand(id + vec2(1, 0));
	float b = mix(bl, br, lv.x);

	float tl = rand(id + vec2(0, 1));
	float tr = rand(id + vec2(1, 1));
	float t = mix(tl, tr, lv.x);

	return mix(b, t, lv.y);
}
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	
	vec3 pos = position;
	float noise = smoothNoise(  pos.xy * 0.008 + vec2(0., uTime * 0.5));
	noise = pow(noise * 0.9, 2.) * 2.;

	// float dispPower = .6 - cos(uv.x * 1.1416) * 10.;
	float dispPower =  1. * min(pos.y, 10.);

	float displacement = noise / 0.8 * (dispPower * .12);

	// pos.xz += pos.y * vec2(1.);

	pos.xz -= displacement * 1.;

	vViewPosition = - pos.xyz;


	
	vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.) ;
	gl_Position = projectionMatrix * modelViewPosition;

	// #include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}
`;