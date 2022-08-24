<template>
    <div class="prev-next-buttons">
        <div class="prev-next-buttons__wrapper-prev">
            <div ref="prevText" class="prev-next-buttons__prev" @click="prevConcept">Prev</div>
        </div>
        <div class="prev-next-buttons__wrapper-next">
            <div ref="nextText" class="prev-next-buttons__next" @click="nextConcept">Next</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import SplitTextJS from 'split-text-js'; 
import {gsap, Expo } from 'gsap'

export default {
    name: 'prev-next-buttons',
    data() {
        return {
            prevText: 'Prev',
            nextText: 'Next',
        }
    },
    computed: mapState({
      threeScene: state => state.scene.threeScene,
      conceptList: state => state.concepts.conceptList,
      currentConcept: state => state.concepts.currentConcept,
      isConceptFocused: state => state.concepts.isConceptFocused,
    }),
    mounted() {
        this.prevText = new SplitTextJS(this.$refs.prevText).chars
        this.nextText = new SplitTextJS(this.$refs.nextText).chars    
    },
    watch: {
        isConceptFocused(payload) {
            payload === true ? this.showButtons() : this.hideButtons()
        }
    },
    methods: {
        showButtons() {
            gsap.to(
                this.prevText,
                {
                    duration: 1, 
                    ease: Expo.easeOut,
                    y: -32, 
                    stagger: {each: 0.08, from:"end"},
                }
            )

            gsap.to(
                this.nextText,
                {
                    duration: 1, 
                    ease: Expo.easeOut,
                    y: -32, 
                    stagger: {each: 0.08, from:"start"}, 
                }
            )
        },
        hideButtons() {
            gsap.to(
                this.prevText,
                {
                    duration: 1, 
                    ease: Expo.easeIn,
                    y: 0, 
                    stagger: {each: 0.08, from:"end"},
                }
            )

            gsap.to(
                this.nextText,
                {
                    duration: 1, 
                    ease: Expo.easeIn,
                    y: 0, 
                    stagger: {each: 0.08, from:"start"}, 
                }
            )
        },
        prevConcept() {
            const prevMeshId = this.currentConcept.id === 0 ? this.conceptList.length - 1 : this.currentConcept.id - 1; 
            this.$store.commit('concepts/setCurrentConcept', prevMeshId)
            this.threeScene.world.focusById(prevMeshId)
        },
        nextConcept() {
            const nextMeshId = this.currentConcept.id === this.conceptList.length -1 ? 0 : this.currentConcept.id + 1; 
            this.$store.commit('concepts/setCurrentConcept', nextMeshId)
            this.threeScene.world.focusById(nextMeshId)
        },
    }
}
</script>

<style lang="scss">
    .prev-next-buttons {
        font-size: 24px;
        color: $white-60;
        cursor: pointer;

        &__wrapper-prev {
            position: absolute;
            top: 50%;
            left: 48px;
            transform: translateY(-50%);
            overflow: hidden;
        }

        &__wrapper-next {
            position: absolute;
            top: 50%;
            right: 48px;
            transform: translateY(-50%);
            overflow: hidden;
        }

        &__prev, &__next {
            transform: translateY(32px);
        }
    }
</style>