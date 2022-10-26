uniform float uTime;
precision highp float;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec3 position;
attribute vec4 color;
attribute float leng;

varying vec3 vPosition;
varying vec4 vColor;

attribute vec2 uv;
varying vec2 vUv;

// attribute blender, a envoyer en vertex
varying float vLeng;


void main()	{
	vUv = uv * uTime;
	vLeng = leng;
	
	vColor = color;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}