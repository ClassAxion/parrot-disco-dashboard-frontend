<template>
    <div class="joysticks">
        <Camera />
        <Pilot />
        <Buttons />
    </div>
</template>

<script>
import Camera from './Camera.vue';
import Pilot from './Pilot.vue';
import Buttons from './Buttons/Buttons.vue';
export default {
    components: {
        Camera,
        Buttons,
        Pilot,
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
    grid-template-columns: repeat(2, 1fr);
}
</style>
