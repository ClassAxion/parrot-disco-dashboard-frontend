<template>
    <button :class="isDisabledClass" @click="updatePosition">
        <img
            src="./../../../assets/img/arrow-collapse-vertical.svg"
            alt="circle"
        />
    </button>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        setPiloting: Function;
        isThrottleEnabled: boolean;
    }
}

export default defineComponent({
    computed: {
        ...mapState({
            isThrottleEnabled: state =>
                (state as Store).state.flyingState !== 0 &&
                (state as Store).permission.canPilotingThrottle,
        }),
        isDisabledClass() {
            return this.isThrottleEnabled ? '' : 'disabled';
        },
    },
    methods: {
        ...mapActions({
            setZeroThrottle: 'setZeroThrottle',
        }),
        updatePosition() {
            if (!this.isThrottleEnabled) return;

            this.setZeroThrottle();
        },
    },
});
</script>
