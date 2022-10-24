precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform float uAlpha;
varying vec3 vColor;

uniform float uSpeed;

void main() {
    vec3 color = uColor * cos(uTime * 3.); 
    gl_FragColor = vec4(color, uAlpha);
}