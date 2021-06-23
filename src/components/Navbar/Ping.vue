<template>
    <div class="ping">
        <span>{{ latency }} ms</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { Store } from 'vuex';
import { Store as StoreInfo } from '@/interfaces/Store';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {}
}

export default defineComponent({
    computed: {
        ...mapState({
            latency: (state: any) => state.network.latency,
        }),
    },
});
</script>

<style lang="scss" scoped>
.ping {
    display: flex;
    align-items: center;
    background-color: #e67e22; //orange
    // background-color: #27ae60; //green
    // background-color: #e74c3c; //red
    color: white;
    font-weight: 600;
    padding: 4px 6px;
    border-radius: 5px;
    span {
        font-size: 0.8rem;
    }
}
</style>
