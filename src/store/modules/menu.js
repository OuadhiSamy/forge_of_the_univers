const state = () => ({
    isMenuOpen: false
})

const getters = {
    getIsMenuOpen: (state) => {
        return state.isMenuOpen;
    }
}

const mutations = {
    openMenu (state) {
        console.log('open');
        state.isMenuOpen = true;
    }, 

    closeMenu (state) {
        console.log('close');
        state.isMenuOpen = false;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}