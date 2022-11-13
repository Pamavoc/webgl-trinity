precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uColor2;
uniform float uAlpha;
uniform float uSound;
uniform float uSound2;
uniform float uSound3;
uniform float uSound4;
uniform float uLineStrength;
uniform float uLineNumberY;
uniform float uHeight;
uniform float uSoundNumber;

varying float vNoise;
varying vec2 vUv;
varying vec3 vPosition;

vec3 color;

void main()
{
    // vec2 wavedUv = vec2(vUv.x,vUv.y + sin(vUv.x * 10.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)  * sin(uTime * 3.)); 

    // megatron
    if(uSoundNumber == 1.) {
        float strength = mod(uSound3 * vUv.x * uLineNumberY, uSound3);
        strength = step(uLineStrength, strength);
        color = mix(uColor, uColor2, strength); // lineNumberY = 84.93 // lineStrength = 0.11

        // float strength = mod(uSound2 * uTime * vUv.x * uLineNumberY, 1.0);
        // strength = step(uLineStrength, strength);
        // color = mix(uColor, uColor2 * vNoise, strength);

        // float strength = mod(uSound3 * vUv.x * uLineNumberY, 1.0);
        // strength = step(uLineStrength, strength);
        // color = mix(uColor, uColor2, strength);
        gl_FragColor = vec4(color, uAlpha);

    } 

    // hillz
    if(uSoundNumber == 2.) {

        
        color = uHeight * uColor;
        gl_FragColor = vec4(color, uAlpha);

    }

   
}