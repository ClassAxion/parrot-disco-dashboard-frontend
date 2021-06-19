<template>
    <nav class="navbar">
        <div class="left">
            <Speed />
            <Altitude />
            <Distance />
            <Server />
            <Battery />
        </div>
        <div class="right">
            <Gamepad />
            <FlightTime />
            <Pitch />
            <Roll />
            <Health />
            <Ping />
            <Settings />
        </div>
    </nav>
</template>

<script lang="ts">
import Battery from './Battery.vue';
import Ping from './Ping.vue';
import Server from './Server.vue';
import Settings from './Settings.vue';
import Health from './Health.vue';
import Roll from './Roll.vue';
import Pitch from './Pitch.vue';
import Gamepad from './Gamepad.vue';
import FlightTime from './FlightTime.vue';
import Speed from './Speed.vue';
import Altitude from './Altitude.vue';
import Distance from './Distance.vue';

export default {
    components: {
        Battery,
        Ping,
        Server,
        Settings,
        Health,
        Roll,
        Pitch,
        Gamepad,
        FlightTime,
        Speed,
        Altitude,
        Distance,
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    grid-column: 1/13;
    background-color: rgba(#3d3d3d, 0.4);
    height: 3rem;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
}

.right,
.left {
    display: flex;
    align-items: center;
}
</style>
