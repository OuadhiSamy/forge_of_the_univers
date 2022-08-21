import { createStore } from 'vuex'
import menu from './modules/menu'
import filters from './modules/filters'
import concepts from './modules/concepts'

export default createStore({
  modules: {
    menu,
    filters,
    concepts
  },
  strict: false,
})