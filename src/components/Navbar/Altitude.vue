<template>
    <div class="altitude" :title="'GPS altitude: ' + gpsAltitude + 'm'">
        <p class="name">Altitude</p>
        <span>{{ altitudeCalculated }} <span class="unit">m</span></span>
    </div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {}
}

export default defineComponent({
    computed: {
        ...mapState({
            altitude: state => (state as Store).orientation.altitude || 0,
            gpsAltitude: state => (state as Store).gps.altitude,
        }),
        altitudeCalculated() {
            return this.altitude.toFixed(0);
        },
    },
});
</script>

<style lang="scss" scoped>
.altitude {
    background: #3d3d3d;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 4px 6px;
    border-radius: 5px;
    margin-left: 1rem;
    .name {
        font-size: 0.6rem;
        line-height: 0.9rem;
    }
    .unit {
        font-size: 0.5rem;
    }
}
</style>
