<template>
    <div class="joysticks">
        <div></div>
        <Camera />
        <Pilot />
        <Throttle />
        <Buttons />
    </div>
</template>

<script lang="ts">
import Camera from './Camera.vue';
import Pilot from './Pilot.vue';
import Buttons from './Buttons/Buttons.vue';
import Throttle from './Throttle.vue';
export default {
    components: {
        Camera,
        Buttons,
        Pilot,
        Throttle,
    },
};
</script>

<style lang="scss" scoped>
.joysticks {
    grid-column: 3/4;
    margin-top: auto;
    padding: 0 0.5rem;
    z-index: 1;
    transition: 0.2s all ease-in-out;
    display: grid;
    grid-template-columns: 80px 140px 140px 40px;
}
</style>
