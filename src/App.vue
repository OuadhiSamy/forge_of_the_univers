<template>
  <div>
    <Navigation />
    <ThreeScene />
    <Menu v-if="isMenuOpen" />
    <Filters v-if="isFiltersOpen" />
    <PrevNextButtons />
    <ConceptDetail v-if="isConceptSelected" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navigation from './components/Navigation.vue'
import ThreeScene from './components/ThreeScene.vue'
import Menu from './components/Menu.vue'
import Filters from './components/Filters.vue'
import PrevNextButtons from './components/PrevNextButtons.vue'
import ConceptDetail from './components/ConceptDetail.vue'


export default {
  components: {
    Navigation,
    ThreeScene,
    Menu,
    Filters,
    PrevNextButtons,
    ConceptDetail,
  },
  computed: mapState({
      isMenuOpen: state => state.menu.isMenuOpen,
      isFiltersOpen: state => state.filters.isFiltersOpen,
      isConceptSelected: state => state.concepts.isConceptSelected
  }),
} 

</script>

<style lang='scss'>
  @import "./styles/index.scss";
</style>
