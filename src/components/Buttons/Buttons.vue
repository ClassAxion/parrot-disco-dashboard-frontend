<template>
    <div class="buttons">
        <TakeOff v-if="!isFlying" />
        <Land v-else />
        <Disconnect />
        <Emergency />
        <p class="poland">Made with <span>❤</span> in Poland</p>
    </div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { Instance as Peer } from 'simple-peer';
import { mapState } from 'vuex';
import Land from './Land.vue';
import TakeOff from './TakeOff.vue';
import Disconnect from './Disconnect.vue';
import Emergency from './Emergency.vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        peer: Peer;
        isFlying: boolean;
    }
}

export default {
    components: {
        Land,
        TakeOff,
        Disconnect,
        Emergency,
    },
    inject: ['peer'],
    computed: {
        ...mapState({
            isFlying: state =>
                [1, 2, 3, 4, 5].includes((state as Store).state.flyingState),
        }),
    },
};
</script>

<style lang="scss" scoped>
.buttons {
    grid-column: 2/3;
    z-index: 10;
    position: relative;
    margin-top: auto;

    button {
        all: unset;
        background-color: #3d3d3d;
        color: white;
        font-weight: 600;
        padding: 12px 16px;
        border-radius: 5px;
        margin: 0 0.5rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
        opacity: 0.4;
        transition: all 0.2s ease-in-out;
        &:hover {
            opacity: 1;
        }
    }

    .poland {
        margin: 0;
        color: white;
        span {
            color: #e74c3c;
        }
    }
}
</style>
