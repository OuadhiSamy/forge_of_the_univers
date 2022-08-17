import { createStore } from 'vuex'
import menu from './modules/menu'
import filters from './modules/filters'

export default createStore({
  modules: {
    menu,
    filters,
  },
  strict: false,
})