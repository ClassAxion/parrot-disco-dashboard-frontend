<template>
    <button :class="isEnabledClass" @click="click" title="center the camera">
        <img :src="centerIcon" alt="circle" />
    </button>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { Instance as Peer } from 'simple-peer';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
const Center = require('@/assets/img/center.svg');

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        peer: Peer;
        isEnabled: boolean;
    }
}

export default defineComponent({
    inject: ['peer'],
    computed: {
        ...mapState({
            isEnabled: state => (state as Store).permission.canMoveCamera,
        }),
        isEnabledClass() {
            return this.isEnabled ? '' : 'disabled';
        },
        centerIcon() {
            return Center;
        },
    },
    methods: {
        click() {
            if (!this.isEnabled) return;

            this.peer.send(JSON.stringify({ action: 'camera-center' }));
        },
    },
});
</script>
