<template>
    <button :class="isEnabledClass" @click="land">Land</button>
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
            isEnabled: (state: any) => [2, 3].includes(state.state.flyingState),
        }),
        isEnabledClass() {
            return this.isEnabled ? '' : 'disabled';
        },
    },
    methods: {
        land() {
            if (!this.isEnabled) return;

            this.peer.send(JSON.stringify({ action: 'land' }));
        },
    },
});
</script>
