precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uColor2;
varying vec2 vUv;
varying float vLeng;
uniform vec2 u_resolution;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Smooth interpolation between 0.1 and 0.9
    //float y = smoothstep(0.1, 0.9, st.x);

    //vec3 color = mod(y * uTime);

    vec3 color = mix(uColor, uColor2 * sin(uTime * 2.), vUv.x);


    // vec3 color = mix(uColor, uColor2, smoothstep(uColor, uColor2, vUv.x), vUv.x);


    // gradient avec un step

    gl_FragColor = vec4(color, 1.);
}