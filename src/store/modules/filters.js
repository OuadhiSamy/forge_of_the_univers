const state = () => ({
    isFiltersOpen: false
})

const getters = {
    getIsFiltersOpen: (state) => {
        return state.isFiltersOpen;
    }
}

const mutations = {
    openFilters (state) {3
        console.log('open');
        state.isFiltersOpen = true;
    }, 

    closeFilters (state) {
        console.log('close');
        state.isFiltersOpen = false;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}