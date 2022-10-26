precision highp float;
#define PI 3.1415926538
uniform sampler2D texture;
varying vec2 vUv;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {

    vec2 uv = vUv - .5;
    uv *= rotate2d(PI * .5);
    uv += .5; 

   vec3 color = texture2D(texture, uv).xyz;
   gl_FragColor = vec4( color, 1.0 );

}