<template>
  <div class="filter__wrapper">
        <div class="filter__title">
            <span>{{ title }}</span>
        </div>
        <div class="filter__content">
            <div class="filter__checkbox" v-for="(filter, i) in filterList" :key="`${filter}-${i}`">
                <input class="custom-checkbox" :id="`${filter}-${i}`" type="checkbox" value="value1">
                <label :for="`${filter}-${i}`">{{ filter }}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'concet-filter',
    props: {
        title: {
            type: String,
            required: true,
        },
        filterList: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            isFilterOpen: true
        }   
    }
}
</script>

<style lang='scss'>
    .filter {
        &__wrapper {
            width: 100%;
            padding-bottom: 16px;
            border-top: 1px solid $white-30;
            // cursor: pointer;

        }

        &__title {
            width: 100%;
            padding: 16px 0;
            color: $white-95;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            cursor: pointer;

        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: 12px;
            // margin-top: 16px;
        }
    }
</style>