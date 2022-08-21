const state = () => ({
    conceptList: [],
    currentConcept: null,
})

const getters = {
    getConceptList: (state) => {
        return state.conceptList;
    }
}

const mutations = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}