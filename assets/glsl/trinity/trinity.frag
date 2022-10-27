precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform float uAlpha;
varying vec3 vColor;

uniform float uSoundNumber;
uniform float uSpeed;

vec3 color;

void main() {
  
    if(uSoundNumber == 0.) {
       color = uColor;  
    } 

    if(uSoundNumber == 1.) {
     
        color = uColor * cos(uTime); 

    } 

    // 
    if(uSoundNumber == 2.) {
      color = uColor; 
 
    }



    gl_FragColor = vec4(color, uAlpha);
}