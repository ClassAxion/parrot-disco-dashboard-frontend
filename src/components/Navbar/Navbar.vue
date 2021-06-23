<template>
    <nav class="navbar">
        <div class="left">
            <Speed />
            <Altitude />
            <Distance />
            <GPS />
            <Battery />
        </div>
        <div class="center">
            <span>{{ flyingStateText }}</span>
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
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

import Battery from './Battery.vue';
import Ping from './Ping.vue';
import GPS from './GPS.vue';
import Settings from './Settings.vue';
import Health from './Health.vue';
import Roll from './Roll.vue';
import Pitch from './Pitch.vue';
import Gamepad from './Gamepad.vue';
import FlightTime from './FlightTime.vue';
import Speed from './Speed.vue';
import Altitude from './Altitude.vue';
import Distance from './Distance.vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        flyingState: number;
    }
}

export default defineComponent({
    components: {
        Battery,
        Ping,
        GPS,
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
    computed: {
        ...mapState({
            flyingState: (state: any) => state.state.flyingState,
        }),
        flyingStateText() {
            switch (this.flyingState) {
                case 0:
                    return 'Landed';
                case 1:
                    return 'Taking off';
                case 2:
                    return 'Hovering';
                case 3:
                    return 'In Flight';
                case 4:
                    return 'Landing';
                case 5:
                    return 'Emergency';
                default:
                    return 'Unknown state ' + this.flyingState;
            }
        },
    },
});
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
.center {
    font-weight: 600;
    color: #fff;
}
</style>
