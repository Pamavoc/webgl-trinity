precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform float uAlpha;
uniform float uSoundNumber;
uniform float uAverage;

vec3 color;

void main() {
    // vec3 color = uColor * cos(uTime * 3.); 

    // home
    if(uSoundNumber == -1.) {
      color = uColor;
    }

    // initialisation
    if(uSoundNumber == 0.) {
      color = uColor;  
    }

    // megatron
    if(uSoundNumber == 1.) {
       color = sin(uColor); 
    }

    // burning
    if(uSoundNumber == 2.) {
        color = sin(uColor); 
    }

   
    gl_FragColor = vec4(color, uAlpha);
}