<template>
    <button :class="isEnabledClass" @click="click">
        <img src="./../../../assets/img/circle.svg" alt="circle" />
    </button>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
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
            isEnabled: state =>
                (state as Store).state.flyingState !== 0 &&
                (state as Store).permission.canPilotingRoll,
        }),
        isEnabledClass() {
            return this.isEnabled ? '' : 'disabled';
        },
    },
    methods: {
        click() {
            if (!this.isEnabled) return;

            this.peer.send(JSON.stringify({ action: 'circle', data: 'CCW' }));
        },
    },
});
</script>
