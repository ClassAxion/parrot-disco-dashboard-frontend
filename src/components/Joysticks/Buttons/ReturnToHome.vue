<template>
    <button :class="isEnabledClass" @click="startReturnToHome">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                class="start"
                fill="#ffffff"
                d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
            />
        </svg>
    </button>
    <button :class="isEnabledClass" @click="stopReturnToHome">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                class="stop"
                fill="#ffffff"
                d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
            />
        </svg>
    </button>
</template>

<script lang="ts">
import { Instance as Peer } from 'simple-peer';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

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
            isEnabled: (state: any) => state.state.flyingState !== 0 && state.permission.canUseAutonomy,
        }),
        isEnabledClass() {
            return this.isEnabled ? '' : 'disabled';
        },
    },
    methods: {
        startReturnToHome() {
            if (!this.isEnabled) return;

            this.peer.send(JSON.stringify({ action: 'rth', data: true }));
        },
        stopReturnToHome() {
            if (!this.isEnabled) return;

            this.peer.send(JSON.stringify({ action: 'rth', data: false }));
        },
    },
});
</script>

<style lang="scss" scoped>
button {
    all: unset;
    background-color: #3d3d3d;
    position: relative;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
    opacity: 0.4;
    &:hover {
        opacity: 1;
    }
}

.start {
    fill: #27ae60;
}
.stop {
    fill: #e74c3c;
}
</style>
