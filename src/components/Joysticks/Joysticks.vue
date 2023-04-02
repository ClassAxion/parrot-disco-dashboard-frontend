<template>
    <div class="joysticks">
        <div></div>
        <Camera />
        <Pilot />
        <Throttle v-if="currentRouteName != 'Mobile'" />
        <Buttons v-if="currentRouteName != 'Mobile'" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Camera from './Camera.vue';
import Pilot from './Pilot.vue';
import Buttons from './Buttons/Buttons.vue';
import Throttle from './Throttle.vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {}
}

export default defineComponent({
    components: {
        Camera,
        Buttons,
        Pilot,
        Throttle,
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        },
    },
});
</script>

<style lang="scss" scoped>
.joysticks {
    grid-column: 3/4;
    margin-top: auto;
    padding: 0 0.5rem;
    z-index: 1;
    transition: 0.2s all ease-in-out;
    display: grid;
    grid-template-columns: 130px 140px 140px 40px;
}
</style>
