<template>
    <input
        type="range"
        class="slider"
        v-model="throttle"
        min="-100"
        max="100"
        @change="updatePosition"
        :disabled="!isThrottleEnabled"
    />
    <div class="throttle"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        throttle: number;
        setPiloting: Function;
    }
}

export default defineComponent({
    data() {
        return {
            throttle: 0,
        };
    },
    computed: {
        ...mapState({
            isThrottleEnabled: (state: any) =>
                state.permission.canPilotingThrottle,
            stateThrottle: (state: any) => state.piloting.throttle,
        }),
    },
    methods: {
        ...mapActions({
            updatePiloting: 'updatePiloting',
        }),
        updatePosition() {
            if (!this.isThrottleEnabled) return;

            let throttle = this.throttle;

            if (throttle > -10 && throttle < 10) throttle = 0;

            this.updatePiloting({ throttle: Number(throttle) });
        },
    },
    watch: {
        stateThrottle(value, previousValue) {
            if (value === 0 && previousValue !== 0) {
                this.throttle = 0;
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.slider {
    width: 128px;
    height: 10px;
    margin: 0;
    transform-origin: 64px 64px;
    transform: rotate(-90deg);
    -webkit-appearance: none;
    border-radius: 3px;
    margin-left: 7px;
    opacity: 0.2;
    transition: 0.2s all ease-in-out;
    position: relative;
    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        background: #3d3d3d;
        border: 3px solid rgba(#3d3d3d, 0.4);
        cursor: pointer;
        border-radius: 50%;
    }
    &::-moz-range-thumb {
        width: 15px;
        height: 15px;
        background: #3d3d3d;
        border: 3px solid rgba(#3d3d3d, 0.4);
        cursor: pointer;
        border-radius: 50%;
        position: relative;
    }

    &:before:-moz-range-thumb {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100px;
        width: 100px;
        background: red;
    }
}
</style>
