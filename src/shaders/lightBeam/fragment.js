const fragment = /* glsl */ `
varying vec2 vUv;
vec4 middleColor = vec4(0.0,1.0,0.0,1.0);
vec4 edgeColor = vec4(0.0,0.0,0.0,0.0);

void main()
{   

    vec2 xy = gl_FragCoord.xy / vUv.xy;
    
    float h = 0.5; // adjust position of middleColor
    vec4 col = mix(mix(edgeColor, middleColor, xy.x/h), mix(middleColor, edgeColor, (xy.x - h)/(1.0 - h)), step(h, xy.x));
    
    gl_FragColor = col;
}
`;

export default fragment;