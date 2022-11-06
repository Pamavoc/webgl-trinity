precision highp float;

uniform float uTime;
uniform float uSound;
uniform float uSound2;
uniform float uSound3;
uniform float uSound4;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
varying float vNoise;
varying vec3 vPosition;

#include ../utils/snoise;


void main()	{
	
	vUv = uv;
    vPosition = position;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	vNoise = snoise(position * uSound);
	// vNoise = position * uSound3;

    //vNoise = snoise(position * uTime * .1);

	//vNoise = uSound3 * uTime * uSound4;
}
