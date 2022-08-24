import { createStore } from 'vuex'
import scene from './modules/scene'
import menu from './modules/menu'
import filters from './modules/filters'
import concepts from './modules/concepts'

export default createStore({
  modules: {
    scene,
    menu,
    filters,
    concepts,
  },
  strict: false,
})