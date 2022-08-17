<template>
  <div class="filters">
    <div class="filters__wrapper">
        <Filter  
        v-for="category in filters" 
        :key="category.title"
        :title='category.title'
        :filterList="category.filters"
    ></Filter>
    </div>
    
  </div>
</template>

<script>
import filters from '../assets/filters.json'
import Filter from './Filter.vue'

export default {
    name: 'filters',
    components: {
        Filter
    },
    data() {
        return {
            filters,
        };
    },
}
</script>

<style lang="scss">
    .filters {
        position: fixed;
        width: 400px;
        height: 100vh;
        padding: 124px 48px 48px;


        &__wrapper {
            height: 100%;
            overflow-y: auto;
        }
    }
</style>