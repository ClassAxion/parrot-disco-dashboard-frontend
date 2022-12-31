<template>
    <button
        :class="isEnabledClass"
        @click="click"
        :title="
            camera.canTakePicture
                ? 'take picture'
                : 'taking picture unavailable'
        "
    >
        <img src="./../../../assets/img/camera.svg" alt="circle" />
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
            camera: state => (state as Store).camera,
        }),
        isEnabledClass() {
            return this.isEnabled && this.camera.canTakePicture
                ? ''
                : 'disabled';
        },
        centerIcon() {
            return Center;
        },
    },
    methods: {
        click() {
            if (!this.isEnabled) return;

            this.peer.send(JSON.stringify({ action: 'take-picture' }));
        },
    },
});
</script>
