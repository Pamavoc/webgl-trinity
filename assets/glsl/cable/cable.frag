precision highp float;
uniform float uTime;
uniform vec3 uColor;

void main() {
    gl_FragColor = vec4(uColor, 1.);
}