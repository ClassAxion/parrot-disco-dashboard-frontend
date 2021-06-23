<template>
    <div class="speed">
        <p class="name">Speed</p>
        <p>
            {{ speedKmh }} <span class="unit">{{ speedUnit }}</span>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        speed: number;
    }
}

export default defineComponent({
    computed: {
        ...mapState({
            speed: (state: any) => state.orientation.speed,
        }),
        speedUnit: () => 'km/h',
        speedMs() {
            return this.speed.toFixed(0);
        },
        speedKmh() {
            return (this.speed * 3.6).toFixed(0);
        },
    },
});
</script>

<style lang="scss" scoped>
.speed {
    background: #3d3d3d;
    color: white;
    font-weight: 600;
    font-size: 0.7rem;
    padding: 4px 6px;
    border-radius: 5px;
    .name {
        font-size: 0.6rem;
        line-height: 0.9rem;
    }
    .unit {
        font-size: 0.5rem;
    }
}
</style>
