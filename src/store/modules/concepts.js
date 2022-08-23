const state = () => ({
    conceptList: [],
    isConceptFocused: false,
    isConceptSelected: false,
    currentConcept: null,
})

const getters = {
    getConceptList (state) {
        return state.conceptList
    },
}

const mutations = {
    setConceptList(state, payload) {
        state.conceptList = payload
    },
    setCurrentConcept(state, payload) {
        state.currentConcept = state.conceptList.filter(concept => concept.id === payload);
    },
    openConceptDetail(state) { 
        state.isConceptSelected = true
    },
    closeConceptDetail(state) {
        state.isConceptSelected = false
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}