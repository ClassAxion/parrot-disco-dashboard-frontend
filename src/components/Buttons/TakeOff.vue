<template>
    <button :class="isEnabledClass" @click="takeOff">Take off</button>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { Instance as Peer } from 'simple-peer';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        isEnabled: boolean;
        peer: Peer;
    }
}

export default defineComponent({
    inject: ['peer'],
    computed: {
        ...mapState({
            health: state => (state as Store).health,
        }),
        isEnabled() {
            const calibration = [
                'pitotCalibrationRequired',
                'magnetoCalibrationRequired',
            ];

            for (const key of calibration) {
                if (this.health[key]) return false;
            }

            const states = [
                'imuState',
                'barometerState',
                'ultrasonicState',
                'gpsState',
                'magnetometerState',
                'verticalCameraState',
                'flightPlanAvailability',
            ];

            for (const key of states) {
                if (!this.health[key]) return false;
            }

            return true;
        },
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
