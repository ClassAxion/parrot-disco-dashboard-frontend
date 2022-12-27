<template>
    <div class="ping" :style="{ background: color }">
        <span>{{ latency }} ms</span>
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
            latency: state => (state as Store).network.latency,
        }),
        color() {
            if (this.latency < 50) {
                return '#27ae60';
            } else if (this.latency < 100) {
                return '#e67e22';
            } else {
                return '#e74c3c';
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.ping {
    display: flex;
    align-items: center;
    color: white;
    font-weight: 600;
    padding: 4px 6px;
    border-radius: 5px;
    span {
        font-size: 0.8rem;
    }
}
</style>
