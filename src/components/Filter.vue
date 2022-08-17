<template>
  <div class="filter__wrapper">
        <div class="filter__title" @click="toggleFilter(title)">
            <span>{{ title }}</span>
        </div>
        <div :id="title" class="filter__content">
            <div class="filter__checkbox" v-for="(filter, i) in filterList" :key="`${filter}-${i}`">
                <input class="custom-checkbox" :id="`${filter}-${i}`" type="checkbox" checked>
                <label :for="`${filter}-${i}`">{{ filter }}</label>
            </div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'

export default {
    name: 'concept-filter',
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
            isFilterOpen: false
        }   
    },
    methods: {
        toggleFilter(title) {
            let options = {
                wrapperHeightDuration: .5,
                checkboxOffset: 24,
                checkboxFadeDuration: .4,
                staggerAmount: 0.05
            }

            let filterWrapper = document.getElementById(title)
            let filterCheckboxes = filterWrapper.children;

            if(this.isFilterOpen === false) {
                gsap.to(
                    filterWrapper,
                    { 
                        duration: options.wrapperHeightDuration, 
                        height: "auto"
                    }
                )
                gsap.fromTo(
                    filterCheckboxes,
                    {
                        x: options.checkboxOffset * -1, 
                        opacity: 0
                    }, 
                    {
                        duration: options.checkboxFadeDuration, 
                        x: options.checkboxOffset, 
                        opacity: 1, 
                        stagger: options.staggerAmount
                    }
                )
                this.isFilterOpen = true
            } else {
                gsap.to(
                    filterWrapper, 
                    {
                         duration: options.wrapperHeightDuration, 
                         height: 0
                    }
                )
                gsap.fromTo(
                    filterCheckboxes,
                    {
                        x: options.checkboxOffset, 
                        opacity: 1
                    }, 
                    {
                        duration: options.checkboxFadeDuration, 
                        x: options.checkboxOffset * -1, 
                        opacity: 0, 
                        stagger: options.staggerAmount
                    }
                )
                this.isFilterOpen = false

            }
        }
    }
}
</script>

<style lang='scss'>
    .filter {
        &__wrapper {
            width: 100%;
            border-top: 1px solid $white-30;
        }

        &__title {
            width: 100%;
            padding: 16px 0;
            color: $white-60;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            cursor: pointer;
            user-select: none;

            &:hover {
                color: $white-95;
                transition: 0.2s ease;
            }
        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: 12px;
            height: 0;
            overflow: hidden;
        }

        &__checkbox:last-child{
            margin-bottom: 16px;
        }
    }
</style>