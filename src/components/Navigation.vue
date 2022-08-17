<template>
  <div class="navigation">
    <div class="navigation__filter">
        <span class="navigation__filter-open" @click="openFilters">Filters</span>
    </div>
    <div class="navigation__logo"></div>
    <div class="navigation__menu" @click="openMenu">
        <svg width="56" height="49" viewBox="0 0 56 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="8" y1="7.5" x2="48" y2="7.5" stroke="#F2F2F2" stroke-width="2"/>
            <line x1="8" y1="23.5" x2="48" y2="23.5" stroke="#F2F2F2" stroke-width="2"/>
            <line x1="8" y1="39.5" x2="48" y2="39.5" stroke="#F2F2F2" stroke-width="2"/>
        </svg>
    </div>
  </div>
</template>

<script>

export default {
    name: 'navigation',
    methods: {
        openMenu() {
            this.$store.commit('menu/openMenu')
        },
        openFilters() {
            this.$store.commit('filters/openFilters')
        }
    }
}
</script>

<style lang='scss'>
    .navigation {
        position: absolute;
        left: 0;
        top: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 48px;

        &__logo {
            width: 177px;
            height: 57px;
            background: grey;
        }

        &__filter {
            cursor: pointer;
        }
    }
</style>