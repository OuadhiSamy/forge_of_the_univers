const vertex = /* glsl */ `

attribute vec3 pos;
varying vec2 vUv;
varying vec3 vPos;


void main() {
    vUv = position.xy + vec2(0.5);
    vec3 finalpos = pos + position * 0.1;

    vec3 particle_position = (modelMatrix * vec4(pos, 1.)).xyz;
    vPos = particle_position;

    vec4 view_pos = viewMatrix * vec4(particle_position, 1.);
    view_pos.xyz += position * 0.05;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( finalpos, 1.0 );
   
    gl_Position = projectionMatrix * view_pos;
}    
`;

export default vertex;