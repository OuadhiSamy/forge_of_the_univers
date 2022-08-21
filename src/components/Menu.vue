<template>
    <div class="menu">
        <div class="menu__wrapper">
            <ul class="menu__list">
                <li class="menu__item">Home</li>
                <li class="menu__item">Login</li>
                <li class="menu__item">About</li>
                <li class="menu__item">Contact</li>
                <li class="menu__item">Credits</li>
            </ul>
            <div class="menu__close" @click="closeMenu">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L41 41M1 41L41 1" stroke="#999999"/>
                </svg>
            </div>
        </div>
        <div class="menu__background-circles">
            <div></div>
            <div></div>
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
        z-index: 999;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at center, rgb(80 54 6 / 18%) 0%,rgb(5, 5, 5) 70%,rgb(0, 0, 0) 100%);
            position: absolute;
            top: 0; 
            left: 0;
            z-index: 0;
        }

        &__wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 2;
        }

        &__list {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            margin-top: 24px;
        }

        &__item {
            position: relative;
            color: $white-60;
            font-size: 64px;
            font-family: 'Krylon';
            text-align: center;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            font-feature-settings: 'liga' off;
            cursor: pointer;
            transition: cubic-bezier(0.215, 0.610, 0.355, 1) .4s all; 

            &:hover {
                color: $white-95;
            }

            &::after {
                content: '';
                width: 0%;
                height: 2px;
                background: $gold;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%);
                transform-origin: center;
                transition: cubic-bezier(0.215, 0.610, 0.355, 1) .4s all; 
            }

            &:hover::after {
                width: 120%;
            }

        }

        &__close {
            margin-top: 96px;
            cursor: pointer;
            transform-origin: center;
            transition: cubic-bezier(0.215, 0.610, 0.355, 1) .4s all; 

            &:hover {
                transform: rotate(90deg);

                path {
                    stroke: $gold;
                }
            }
        }

        // &__background-circles {
        //     z-index: 1;

        //     div:nth-child(1) {
        //         position: absolute;
        //         bottom: -70%;
        //         left: -25%;
        //         width: 2000px;
        //         height: 2000px;
        //         opacity: 0.05;
        //         background: radial-gradient(32.1% 45.88% at 50% 50%, #715F00 0%, rgba(18, 18, 18, 0) 100%);
        //         transform: rotate(20.7deg);
        //     }

        //     div:nth-child(2) {
        //         position: absolute;
        //         right: -30%;
        //         top: -45%;
        //         width: 2000px;
        //         height: 2000px;
        //         background: radial-gradient(40.23% 45.88% at 50% 50%, #713D00 0%, rgba(18, 18, 18, 0) 100%);
        //         opacity: 0.05;
        //         transform: rotate(-31.81deg);
        //     } 
        // }
    }
</style>