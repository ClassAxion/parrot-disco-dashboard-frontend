<template>
    <button :class="isEnabledClass" @click="takeOff">Take off</button>
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
            isEnabled: (state: any) => state.state.canTakeOff,
        }),
        isEnabledClass() {
            return this.isEnabled ? '' : 'disabled';
        },
    },
    methods: {
        takeOff() {
            if (!this.isEnabled) return;

            this.peer.send(JSON.stringify({ action: 'takeOff' }));
        },
    },
});
</script>
