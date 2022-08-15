<template>
    <div class="menu">
        <div class="menu__wrapper">
            <ul class="menu__list">
                <li class="menu__item">Item</li>
                <li class="menu__item">Item</li>
                <li class="menu__item">Item</li>
                <li class="menu__item">Item</li>
                <li class="menu__item">Item</li>
                <li class="menu__item">Item</li>
            </ul>
            <div class="menu__close" @click="closeMenu">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L41 41M1 41L41 1" stroke="#999999"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menu',
    methods: {
        closeMenu (){
            this.$store.commit('menu/closeMenu')
        }
    }
}
</script>

<style lang="scss">
    .menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: black;

        &__wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__list {
            display: flex;
            flex-direction: column;
            gap: 24px;
            margin-top: 24px;
        }

        &__item {
            color: $white-60;
            font-size: 64px;
            text-align: center;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            font-feature-settings: 'liga' off;
            cursor: pointer;

        }

        &__close {
            margin-top: 96px;
            cursor: pointer;
        }
    }
</style>