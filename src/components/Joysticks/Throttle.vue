<template>
    <input
        type="range"
        class="slider"
        v-model="throttle"
        min="-100"
        max="100"
        @change="updatePosition"
    />
    <div class="throttle"></div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        throttle: number;
        setPiloting: Function;
        isThrottleEnabled: boolean;
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
            isGamepadActive: state =>
                (state as Store).gamepad.isConnected &&
                (state as Store).gamepad.isEnabled,
            isThrottleEnabled: state =>
                (state as Store).state.flyingState !== 0 &&
                (state as Store).permission.canPilotingThrottle,
            stateThrottle: state => (state as Store).piloting.throttle,
        }),
    },
    methods: {
        ...mapActions({
            updatePiloting: 'updatePiloting',
        }),
        updatePosition() {
            if (this.isGamepadActive) return;

            if (!this.isThrottleEnabled) {
                this.throttle = 0;
                return;
            }

            let throttle = this.throttle;

            if (throttle > -10 && throttle < 10) throttle = 0;

            console.log(throttle);

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
    appearance: none;
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
.slider:disabled {
    background-color: initial;
    color: rgb(197, 197, 197);
}
</style>
