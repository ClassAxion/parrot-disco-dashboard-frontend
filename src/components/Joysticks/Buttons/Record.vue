<template>
    <button
        :class="isEnabledClass"
        @click="click"
        :title="
            camera.isRecording ? 'recording, click to stop' : 'start recording'
        "
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="20"
            height="20"
            viewBox="0 0 24 24"
        >
            <path
                :fill="camera.isRecording ? '#27ae60' : '#ffffff'"
                d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
            />
        </svg>
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
            return this.isEnabled ? '' : 'disabled';
        },
        centerIcon() {
            return Center;
        },
    },
    methods: {
        click() {
            if (!this.isEnabled) return;

            if (this.camera.isRecording) {
                this.peer.send(
                    JSON.stringify({ action: 'record', data: false }),
                );
            } else {
                this.peer.send(
                    JSON.stringify({ action: 'record', data: true }),
                );
            }
        },
    },
});
</script>
