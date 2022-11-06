precision highp float;
uniform float uTime;
uniform mat4 modelViewMatrix; 
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
varying vec3 vPosition;


void main()	{
	
	vUv = uv;
    vPosition = position;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

