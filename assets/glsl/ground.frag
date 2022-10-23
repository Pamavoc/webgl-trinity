varying vec2 v_uv;
varying float v_altitude;
varying float v_moisture;
varying float v_type;
uniform vec2 u_resolution;
uniform float u_time;
#include ./utils/map;

void main() {
	vec3 color = mix(vec3(0.0667, 0.3412, 0.2039), vec3(0.3176, 0.4863, 0.3765), v_moisture);
	float heavy_green = map(v_moisture, 0., 1., 0., 1.);
	if(heavy_green < 1.) {
		color = mix(vec3(0.1451, 0.2314, 0.1804), color, heavy_green);
	}

	// water
	if(v_type == 1.) {
		float a = 1. - map(v_altitude, 0., .5, 0., 1.);
		color = mix(vec3(0.2314, 0.3843, 0.902), vec3(0.0, 0.0078, 0.0314), a);
		// color = smoothstep(color, vec3(0.051, 0.0392, 0.8549), a);
		// color = vec3(a);
	}

	gl_FragColor = vec4(color, 1.0);
}