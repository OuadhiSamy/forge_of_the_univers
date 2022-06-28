const fragment = /* glsl */ `
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vPos;

void main()
{   
    vec4 ttt = texture2D(uTexture, vUv);
    float alpha = 0.5 * (vPos.y * vPos.y * -1.) + 0.5;
    gl_FragColor = vec4(1., 1., 1.,  ttt.r * alpha * 2.);
}
`;

export default fragment;