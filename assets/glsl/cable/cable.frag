precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uColor2;
varying vec2 vUv;


void main() {


   float pct = abs(sin(uTime));

    float strength = vUv.x * pct;

    vec3 color = mix(uColor, uColor2, pct);

    gl_FragColor = vec4(color, 1.);
}