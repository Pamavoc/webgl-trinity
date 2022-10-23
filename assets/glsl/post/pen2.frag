#define NoiseTex tNoise
#define prevPass tDiffuse
#define iResolution uResolution
#define saturate(x) clamp(x, 0., 1.)

uniform sampler2D tDiffuse;
uniform sampler2D tNoise;
uniform vec2 uResolution;
varying vec2 vUv;

#pragma glslify: cnoise2 = require(glsl-noise/simplex/2d) 

// in vec2 fragCoord;

#define VIGNETTING
#define STROKE_THICKNESS (min(iResolution.x,iResolution.y)/500.)
#define GRADIENT_EPS (STROKE_THICKNESS * .3)

const float PI = acos(-1.);
const float PI2 = 2. * PI;
const float PHI = 1.61803398874989484820459;

float gold_random(in vec2 xy, in float seed) {
    return fract(tan(distance(xy * PHI, xy) * seed) * xy.x);
}

float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

struct DistortionParams {
    float value, amplitude;
} NO_DISTORTION = DistortionParams(0., 0.);
#define DISTORTION_OUTLINE_1(x) DistortionParams( 1.7 * pow(1.3, -x * 5.), .15 * pow(1.3, x * 5.))
#define DISTORTION_OUTLINE_2(x) DistortionParams(5. * pow(1.3, -fi * 5.), .4 * pow(1.3, fi * 5.))

vec4 distortion(const in vec2 pos) {
    vec2 noiseTextureRes = vec2(textureSize(NoiseTex, 0));
    vec2 uv = pos / noiseTextureRes;
    uv += .6 * sin(uv * noiseTextureRes * PI2) / PI2 / noiseTextureRes;
    return texture(NoiseTex, uv * .5);
}

vec4 distortedDiffuseColor(const in vec2 pos, const in DistortionParams distortionParams) {
    vec2 distortionValue = (distortion(pos * .05 * distortionParams.value / STROKE_THICKNESS) - .5).xy * 10. * distortionParams.amplitude;
    vec2 uv = (pos + distortionValue * STROKE_THICKNESS) / iResolution.xy;
    return texture(prevPass, uv);
}

float luminance(const in vec2 pos, const in DistortionParams distortionParams) {
    // return saturate(dot(distortedDiffuseColor(pos, distortionParams).xyz, vec3(.333)));
    return saturate(dot(distortedDiffuseColor(pos, distortionParams).xyz, vec3(.333)));
}

vec2 gradient(const in vec2 pos, const in DistortionParams distortionParams) {
    vec2 d = vec2(GRADIENT_EPS, 0.);
    return vec2(luminance(pos + d.xy, distortionParams) - luminance(pos - d.xy, distortionParams), luminance(pos + d.yx, distortionParams) - luminance(pos - d.yx, distortionParams)) / GRADIENT_EPS / 2.;
}

void main() {
    vec4 fragColor;
    vec2 fragCoord = gl_FragCoord.xy;
    float stroke = 0.;

    //strokes
    for(int i = 0; i < 3; i++) {
        float fi = float(i) / 2.;
        float strokeStrength = .03 + .5 * fi;
        // one closely matched edge-line
        stroke += .6 * (.5 + fi) * smoothstep(0., strokeStrength, length(gradient(fragCoord, DISTORTION_OUTLINE_1(fi)) * STROKE_THICKNESS));
        // another wildly varying edge-line
        stroke += .4 * (.2 + fi) * smoothstep(0., strokeStrength, length(gradient(fragCoord, DISTORTION_OUTLINE_2(fi)) * STROKE_THICKNESS));
    }
    vec4 r2 = distortion(fragCoord * 1.2 / sqrt(STROKE_THICKNESS));
    fragColor.xyz = vec3(1.) - saturate(.7 * stroke * (.5 + .5 * r2.z));

    // subtraction of 2 rand values, so its [-1..1] and noise-wise not as white anymore
    vec4 r = distortion(fragCoord * 1.2 / sqrt(STROKE_THICKNESS)) - distortion(fragCoord * 1.2 / sqrt(STROKE_THICKNESS) + vec2(1, -1) * 1.5);

    // cross hatch
    const int HATCHES_COUNT = 5;
    #define N(v) (v.yx * vec2(-1, 1))
    #define CS(ang) cos(ang - vec2(0, 1.6))
    float fragLum = luminance(fragCoord + 2.5 * STROKE_THICKNESS * (distortion(fragCoord * .02).xy - .5), NO_DISTORTION) * 1.5;
    float hatchesSum = 0.;
    float strongestHatch = 0.;
    float actualHatchesCount = 0.;
    for(actualHatchesCount = 0.; actualHatchesCount < float(HATCHES_COUNT); actualHatchesCount++) {
        // chose the hatch angle to be prop to i*i
        // so the first 2 hatches are close to the same angle, 
        // and all the higher i's are fairly random in angle
        float hatchAng = -.5 - .08 * actualHatchesCount * actualHatchesCount;
        vec2 rotatedUV = mat2(CS(hatchAng), N(CS(hatchAng))) * fragCoord / sqrt(STROKE_THICKNESS) * vec2(.05, 1) * 2.3;
        float rh = pow(distortion(rotatedUV + vec2(sin(rotatedUV.y), 0.)), vec4(1.)).x;
        float currentHatch = 1. - smoothstep(.5, 1.5, (rh) + fragLum ) - .3 * abs(r.z);
        // float currentHatch = 1. - smoothstep(.5, 1.5, (rh) + fragLum) - .3 * abs(r.z);
        hatchesSum += currentHatch;
        strongestHatch = max(strongestHatch, currentHatch);
        if(actualHatchesCount >= 2. && actualHatchesCount > (1. - fragLum) * float(HATCHES_COUNT)) break;
    }

    fragColor.xyz *= 1. - saturate(mix(hatchesSum / actualHatchesCount, strongestHatch, .5)) * 0.18;
    fragColor.xyz *= vec3(fragLum);
    fragColor.xyz *=  texture2D(prevPass, vUv).xyz;
    // fragColor.xyz = 1. - ((1. - fragColor.xyz) * .7);
    // // paper

    fragColor.xyz *= .95 + .06 * r.xxx + .06 * r.xyz;
    fragColor.w = 1.;
    // fragColor.xyz = fragColor.xyz * 0.9 + texture(prevPass, vUv).xyz * 0.1;

    // vec2 scc = (fragCoord - .5 * iResolution.xy) / iResolution.x;
    // float vign = 1. - .3 * dot(scc, scc);
    // vign *= 1. - .7 * exp(-sin(fragCoord.x / iResolution.x * PI) * 40.);
    // vign *= 1. - .7 * exp(-sin(fragCoord.y / iResolution.y * PI) * 20.);
    // fragColor.xyz *= vign;

    gl_FragColor = vec4(fragColor.xyz, 1.);

    // gl_FragColor = vec4(vec3(strongestHatch), 1.);

// #ifdef VIGNETTING
//     {
//     }
// #endif
    //fragColor = texelFetch(prevPass, ivec2(fragCoord), 0);
}