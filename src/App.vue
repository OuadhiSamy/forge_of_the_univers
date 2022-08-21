<template>
  <div>
    <Navigation />
    <ThreeScene />
    <Menu v-if="isMenuOpen" />
    <Filters v-if="isFiltersOpen" />
    <Prev-next-buttons />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navigation from './components/Navigation.vue'
import ThreeScene from './components/ThreeScene.vue'
import Menu from './components/Menu.vue'
import Filters from './components/Filters.vue'
import PrevNextButtons from './components/PrevNextButtons.vue'


export default {
  components: {
    Navigation,
    ThreeScene,
    Menu,
    Filters,
    PrevNextButtons,
  },
  computed: mapState({
      isMenuOpen: state => state.menu.isMenuOpen,
      isFiltersOpen: state => state.filters.isFiltersOpen
  }),
} 

</script>

<style lang='scss'>
  @import "./styles/index.scss";
</style>
