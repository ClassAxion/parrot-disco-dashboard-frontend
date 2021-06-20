<template>
    <div class="dashboard">
        <Navbar />
        <Map />
        <Buttons />
        <Joysticks />
        <div class="camera">
            <video src="../assets/video/bg.mp4" loop autoplay></video>
        </div>
    </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar/Navbar.vue';
import Map from '@/components/Map/Map.vue';
import Buttons from '@/components/Buttons/Buttons.vue';
import Joysticks from '@/components/Joysticks/Joysticks.vue';

export default {
    components: {
        Navbar,
        Map,
        Buttons,
        Joysticks,
    },
};
</script>

<style lang="scss">
.dashboard {
    display: grid;
    grid-template-columns: 300px 1fr 320px;
    width: 100vw;
    height: 100vh;
    background-color: #3d3d3d;
    @media (max-width: 1300px) {
        grid-template-columns: 250px 1fr 320px;
    }
}

.navbar {
    background-color: rgba(#3d3d3d, 0.4);
    height: 3rem;
    z-index: 1;
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
