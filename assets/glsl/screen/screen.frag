precision highp float;
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;


void main()
{
    vec2 wavedUv = vec2(vUv.x,vUv.y + sin(vUv.x * 10.0) * 0.1);
    float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)  * sin(uTime * 3.)); 
    gl_FragColor = vec4(vec3(strength), 1.0);
}