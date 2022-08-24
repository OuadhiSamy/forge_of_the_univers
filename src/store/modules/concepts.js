const state = () => ({
    conceptList: [],
    isConceptFocused: false,
    isConceptSelected: false,
    currentConcept: null,
})

const mutations = {
    setConceptList(state, payload) {
        state.conceptList = payload
    },
    setIsConceptFocused(state, payload) {
        state.isConceptFocused = payload
    },
    setIsConceptSelected(state, payload) {
        state.isConceptSelected = payload
    },
    setCurrentConcept(state, payload) {
        console.log(payload)
        state.currentConcept = state.conceptList.filter(concept => concept.id === payload)[0];
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
    mutations,
}