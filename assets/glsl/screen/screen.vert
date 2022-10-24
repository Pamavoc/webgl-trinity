uniform float uTime;
precision highp float;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec3 position;
attribute vec4 color;

varying vec3 vPosition;
varying vec4 vColor;

attribute vec2 uv;
varying vec2 vUv;

void main()	{
	
	vUv = uv;

    vPosition = position;
	vColor = color;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}



