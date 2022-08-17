<template>
  <div class="navigation">
    <div class="navigation__filter">
        <span v-if="isFiltersOpen === false" class="navigation__filter-open" @click="openFilters">Filters</span>
        <span v-else class="navigation__filter-close" @click="closeFilters">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L25 25M1 25L25 1" stroke="#999999"/>
            </svg>
        </span>
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
import gsap from 'gsap'
import { mapState } from 'vuex'

export default {
    name: 'navigation',
    computed: mapState({
        isFiltersOpen: state => state.filters.isFiltersOpen
    }),
    methods: {
        openMenu() {
            this.$store.commit('menu/openMenu')
        },
        openFilters() {
            this.$store.commit('filters/openFilters')
        },
        closeFilters() {
            this.$store.commit('filters/closeFilters')
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
        z-index: 1;

        &__logo {
            width: 177px;
            height: 57px;
            background: grey;
        }

        &__filter {
            position: relative;
            width: 70px;
            cursor: pointer;

            &-close {
                // opacity: 0;
                position: absolute;
                top: 50%;
                left: 0%;
                transform: translate(0, -50%);
            }
        }
    }
</style>