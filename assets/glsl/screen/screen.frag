precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uColor2;
uniform float uAlpha;
uniform float uSound;
uniform float uSound2;
uniform float uSound3;
uniform float uSound4;

varying float vNoise;

varying vec2 vUv;
uniform float uLineStrength;
uniform float uLineNumberY;

varying float vPosition;

void main()
{
    //vec2 wavedUv = vec2(vUv.x,vUv.y + sin(vUv.x * 10.0) * 0.1);
    //float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)  * sin(uTime * 3.)); 

    float strength = mod(uSound2 * uSound3 * vUv.x * uLineNumberY, 1.0);
    strength = step(uLineStrength, strength);

    vec3 color = mix(uColor * vNoise, uColor2 * vNoise, strength);
    gl_FragColor = vec4(color, 1.);
}