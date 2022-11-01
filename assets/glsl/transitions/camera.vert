void main() {
  vec3 nPos = position;
  nPos.z = -1.;
  gl_Position = vec4(nPos, 1.0);
}