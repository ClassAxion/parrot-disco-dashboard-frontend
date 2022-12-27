<template>
    <div class="distance">
        <p class="name">Distance</p>
        <span>
            {{ distanceCalculated }}
            <span class="unit">{{ distanceUnit }}</span>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { latLng, LatLng } from 'leaflet';
import { Store } from '@/interfaces/Store';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        discoLocation: { latitude: number; longitude: number };
        homeLocation: { latitude: number; longitude: number };
        distance: number;
    }
}

export default defineComponent({
    computed: {
        ...mapState({
            discoLocation: state => ({
                latitude: (state as Store).gps.latitude,
                longitude: (state as Store).gps.longitude,
            }),
            homeLocation: state => ({
                latitude: (state as Store).home.latitude,
                longitude: (state as Store).home.longitude,
            }),
        }),
        distance() {
            if (!this.discoLocation.latitude || !this.discoLocation.longitude) {
                return 0;
            }

            const discoLatLng: LatLng = latLng(
                this.discoLocation.latitude,
                this.discoLocation.longitude,
            );

            const homeLatLng: LatLng = latLng(
                this.homeLocation.latitude,
                this.homeLocation.longitude,
            );

            return homeLatLng.distanceTo(discoLatLng);
        },
        distanceCalculated() {
            const value: number = this.distance;

            if (value > 1000) {
                return (value / 1000).toFixed(1);
            } else {
                return value.toFixed(0);
            }
        },
        distanceUnit() {
            return this.distance > 1000 ? 'km' : 'm';
        },
    },
});
</script>

<style lang="scss" scoped>
.distance {
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
