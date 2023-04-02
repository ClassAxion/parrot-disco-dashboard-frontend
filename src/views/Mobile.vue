<template>
    <div class="dashboard">
        <Stream />
        <Buttons />
        <Joysticks />
    </div>
</template>

<script lang="ts">
import Buttons from '@/components/Buttons/Buttons.vue';
import Joysticks from '@/components/Joysticks/Joysticks.vue';
import Stream from '@/components/Stream/Stream.vue';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { Store } from '@/interfaces/Store';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {}
}

export default defineComponent({
    components: {
        Buttons,
        Joysticks,
        Stream,
    },
    computed: {
        ...mapState({
            isConnected: state => (state as Store).isConnected,
        }),
    },
    mounted() {
        if (!process.env.VUE_APP_NO_DISCO && !this.isConnected)
            window.location.href = '/';
    },
});
</script>

<style lang="scss">
.dashboard {
    display: grid;
    grid-template-columns: 300px 1fr 450px;
    width: 100vw;
    height: 100vh;
    background-color: #3d3d3d;
    @media (max-width: 1300px) {
        grid-template-columns: 1fr 320px;
    }
}

.navbar {
    background-color: rgba(#3d3d3d, 0.4);
    height: 3rem;
    z-index: 1;
}
</style>
