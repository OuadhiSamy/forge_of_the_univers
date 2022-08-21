const state = () => ({
    conceptList: [],
    isConceptFocused: false,
    isConceptSelected: false,
    currentConcept: null,
})

const getters = {
    getConceptList: (state) => {
        return state.conceptList;
    }
}

const mutations = {
    openConceptDetail(state) {
        state.isConceptSelected = true;
    },
    closeConceptDetail(state) {
        state.isConceptSelected = false;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}