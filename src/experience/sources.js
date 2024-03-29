export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path: [
            '../src/assets/environmentMap/px.jpg',
            '../src/assets/environmentMap/nx.jpg',
            '../src/assets/environmentMap/py.jpg',
            '../src/assets/environmentMap/ny.jpg',
            '../src/assets/environmentMap/pz.jpg',
            '../src/assets/environmentMap/nz.jpg',
        ]
    },
    {
        name: 'path',
        type: 'gltfModel',
        path: [
            '../src/assets/lightpath/ring_simple.glb',
        ],
    },
    {
        name: 'ringTexture',
        type: 'texture',
        path: [
            '../src/assets/lightpath/ring_bake_cc.png',
        ],
    }
]