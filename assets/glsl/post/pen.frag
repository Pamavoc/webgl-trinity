uniform sampler2D tDiffuse;
uniform vec2 uResolution;
varying vec2 vUv;

#define iResolution uResolution
#define iChannel0 tDiffuse

#define PI2 6.28318530717959

#define RANGE 16.
#define STEP 2.
#define ANGLENUM 4.

// Grayscale mode! This is for if you didn't like drawing with colored pencils as a kid
//#define GRAYSCALE

// Here's some magic numbers, and two groups of settings that I think looks really nice. 
// Feel free to play around with them!

#define MAGIC_GRAD_THRESH 0.05

// Setting group 1:
/*#define MAGIC_SENSITIVITY     4.
#define MAGIC_COLOR           1.*/

// Setting group 2:
#define MAGIC_SENSITIVITY     10.
#define MAGIC_COLOR           0.5

//---------------------------------------------------------
// Your usual image functions and utility stuff
//---------------------------------------------------------
vec4 getCol(vec2 pos) {
	vec2 uv = pos / iResolution.xy;
	return texture(iChannel0, uv);
}

float getVal(vec2 pos) {
	vec4 c = getCol(pos);
	return dot(c.xyz, vec3(0.2126, 0.7152, 0.0722));
}

vec2 getGrad(vec2 pos, float eps) {
	vec2 d = vec2(eps, 0);
	return vec2(getVal(pos + d.xy) - getVal(pos - d.xy), getVal(pos + d.yx) - getVal(pos - d.yx)) / eps / 2.;
}

void pR(inout vec2 p, float a) {
	p = cos(a) * p + sin(a) * vec2(p.y, -p.x);
}
float absCircular(float t) {
	float a = floor(t + 0.5);
	return mod(abs(a - t), 1.0);
}

//---------------------------------------------------------
// Let's do this!
//---------------------------------------------------------
void main() {
	vec2 pos = vUv;
	float weight = 1.0;

	for(float j = 0.; j < ANGLENUM; j += 1.) {
		vec2 dir = vec2(1, 0);
		pR(dir, j * PI2 / (2. * ANGLENUM));

		vec2 grad = vec2(-dir.y, dir.x);

		for(float i = -RANGE; i <= RANGE; i += STEP) {
			vec2 pos2 = pos + normalize(dir) * i;

            // video texture wrap can't be set to anything other than clamp  (-_-)
			if(pos2.y < 0. || pos2.x < 0. || pos2.x > iResolution.x || pos2.y > iResolution.y)
				continue;

			vec2 g = getGrad(pos2, 1.);
			if(length(g) < MAGIC_GRAD_THRESH)
				continue;

			weight -= pow(abs(dot(normalize(grad), normalize(g))), MAGIC_SENSITIVITY) / floor((2. * RANGE + 1.) / STEP) / ANGLENUM;
		}
	}

#ifndef GRAYSCALE
	vec4 col = getCol(pos);
#else
	vec4 col = vec4(getVal(pos));
#endif

	vec4 background = mix(col, vec4(1), MAGIC_COLOR);

    // I couldn't get this to look good, but I guess it's almost obligatory at this point...
    /*float distToLine = absCircular(fragCoord.y / (iResolution.y/8.));
    background = mix(vec4(0.6,0.6,1,1), background, smoothstep(0., 0.03, distToLine));*/

    // because apparently all shaders need one of these. It's like a law or something.
	float r = length(pos - iResolution.xy * .5) / iResolution.x;
	float vign = 1. - r * r * r;

	vec4 a = texture2D(tDiffuse, vUv);

	gl_FragColor = mix(vec4(0), background, weight) + a.xxxx / 25.;
    //fragColor = getCol(pos);
}
