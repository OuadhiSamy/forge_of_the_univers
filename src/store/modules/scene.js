const state = () => ({
    threeScene: null,
})

const mutations = {
    setThreeScene(state, payload) {
        state.threeScene = payload
    },
    moveCameraToMeshMesh(state, payload) {
        state.threeScene.camera.moveCameraToMeshMesh(payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}