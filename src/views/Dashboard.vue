<template>
    <div class="dashboard">
        <Navbar />
        <Map />
        <Buttons />
        <div class="joystick"></div>
        <div class="camera">
            <video src="../assets/video/bg.mp4" loop autoplay></video>
        </div>
    </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar/Navbar.vue';
import Map from '@/components/Map/Map.vue';
import Buttons from '@/components/Buttons/Buttons.vue';

export default {
    components: {
        Navbar,
        Map,
        Buttons,
    },
};
</script>

<style lang="scss">
.dashboard {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    width: 100vw;
    height: 100vh;
    background-color: #3d3d3d;
}

.navbar {
    grid-column: 1/13;
    background-color: rgba(#3d3d3d, 0.4);
    height: 3rem;
    z-index: 1;
}

.joystick {
    grid-column: 11/13;
    background-color: red;
    margin-top: auto;
    aspect-ratio: 1;
    opacity: 0.5;
    z-index: 1;
    transition: 0.2s all ease-in-out;
    &:hover {
        opacity: 1;
    }
}

.camera {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    video {
        min-width: 100%;
        min-height: 100%;
        margin: 0;
    }
}
</style>
