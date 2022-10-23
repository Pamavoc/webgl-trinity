// #include ./utils/snoise3;
#include ./utils/pnoise3;

varying vec2 v_uv;
varying float v_altitude;
varying float v_moisture;
varying float v_type;

float biome(float alt) {
	if(alt < 0.5)
		return 1.; // water
	else
		return 0.;	// land
}

float noise(float offset, float freq) {
	float n = 1.5 * pnoise3(vec3(uv * freq * 1., 1. + offset * 3.));
	n += .5 * pnoise3(vec3(uv * freq * 2., 5.2 + offset * 3.));
	n += .25 * pnoise3(vec3(uv * freq * 4., 10.1 + offset * 3.));
	n /= (1. + .5 + .25);
	n = pow(n, 1.20);
	return n;
}

void main() {
	v_uv = uv;
	vec3 pos = position;

	v_altitude = noise(0., 5.);
	v_moisture = noise(10., 14.);
	pos.y += v_altitude * 1.;
	v_type = biome(v_altitude);

	pos.y = max(pos.y, .5);

	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
