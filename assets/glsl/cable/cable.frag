precision highp float;
uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uResolution;
uniform float uSoundNumber;
uniform float uHeight;
uniform float uAverage;

varying vec2 vUv;
varying float vLeng;


void main() {
    

    // home
    if(uSoundNumber == -1.) {
        
        gl_FragColor = vec4(uColor, 1);
    } 

    // intro
    if(uSoundNumber == 0.) {
    
        vec3 color = vec3(mix(uColor3 * uAverage * 1., uColor2 * cos(uTime * 2.), vUv.x));
        gl_FragColor = vec4(color, 1.);
        //gl_FragColor  = vec4(color, 1.);
    } 


    // megatron
    if(uSoundNumber == 1.) {
        gl_FragColor = vec4(uColor2, uTime);
    } 

    // burningman
    if(uSoundNumber == 2.) {
        vec3 color = vec3(mix(uColor3 * uAverage * 1., uColor2, vUv.x));
        gl_FragColor = vec4(color, uAlpha);
    }
}