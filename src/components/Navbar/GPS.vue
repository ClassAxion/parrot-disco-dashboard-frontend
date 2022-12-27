<template>
    <div class="gps" :style="{ background: color }">
        <span>{{ availableSatellites }}</span>
        <img src="./../../assets/img/glob.svg" alt="glob" />
    </div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        isFixed: boolean;
    }
}

export default defineComponent({
    computed: {
        ...mapState({
            availableSatellites: state =>
                (state as Store).gps.availableSatellites || 0,
            isFixed: state => (state as Store).gps.isFixed,
        }),
        color() {
            return this.isFixed ? '#27ae60' : '#e74c3c';
        },
    },
});
</script>

<style lang="scss" scoped>
.gps {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    margin-left: 1rem;
    padding: 4px 6px;
    border-radius: 5px;
    span {
        font-weight: 600;
        font-size: 0.8rem;
        color: white;
        margin-right: 0.2rem;
    }
    img {
        height: 1rem;
    }
}
</style>
