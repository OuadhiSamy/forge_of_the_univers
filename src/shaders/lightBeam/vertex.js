const vertex = /* glsl */ `

attribute vec3 pos;
varying vec2 vUv;
varying vec3 vPos;


void main() {
    // vUv = pos; 

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
}    
`;

export default vertex;