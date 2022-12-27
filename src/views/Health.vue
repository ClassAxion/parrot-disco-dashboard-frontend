<template>
    <div class="health">
        <Background />
        <form>
            <h1>Health status</h1>
            <router-link to="/dashboard" class="back"
                >Back to flight</router-link
            >

            <div class="inputWrapper">
                <p class="title" v-for="sensor of sensors" :key="sensor.id">
                    {{ sensor.name }} &minus;
                    <strong
                        class="good"
                        v-if="
                            sensor.canBeCalibrated
                                ? !health[sensor.id]
                                : !!health[sensor.id]
                        "
                        >OK</strong
                    >
                    <strong class="bad" v-else>{{
                        sensor.canBeCalibrated ? 'Needs calibration' : 'Bad'
                    }}</strong>
                </p>
            </div>

            <p class="poland">Made with <span>❤</span> in Poland</p>
        </form>
        <div class="overlay"></div>
    </div>
</template>

<script lang="ts">
import Background from '@/components/Background/Background.vue';
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        sensors: { id: string; canBeCalibrated: boolean; name: string }[];
    }
}

export default defineComponent({
    components: {
        Background,
    },
    data() {
        return {
            sensors: [
                {
                    id: 'pitotCalibrationRequired',
                    canBeCalibrated: true,
                    name: 'Pitot tube',
                },
                {
                    id: 'magnetoCalibrationRequired',
                    canBeCalibrated: true,
                    name: 'Magnetometer',
                },
                {
                    id: 'imuState',
                    canBeCalibrated: false,
                    name: 'IMU',
                },
                {
                    id: 'barometerState',
                    canBeCalibrated: false,
                    name: 'Barometer',
                },
                {
                    id: 'ultrasonicState',
                    canBeCalibrated: false,
                    name: 'Ultrasonic',
                },
                {
                    id: 'gpsState',
                    canBeCalibrated: false,
                    name: 'GPS',
                },
                {
                    id: 'magnetometerState',
                    canBeCalibrated: false,
                    name: 'Magnetometer',
                },
                {
                    id: 'verticalCameraState',
                    canBeCalibrated: false,
                    name: 'Vertical Camera',
                },
                {
                    id: 'motorState',
                    canBeCalibrated: false,
                    name: 'Motor',
                },
            ],
        };
    },
    computed: {
        ...mapState({
            health: state => (state as Store).health,
        }),
    },
});
</script>

<style lang="scss" scoped>
.health {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .good {
        color: green;
        font-weight: 600;
    }

    .bad {
        color: red;
        font-weight: 600;
    }

    form {
        background-color: white;
        width: 50vw;
        height: 75vh;
        border-radius: 5px;
        padding: 2rem;
        z-index: 1;
        position: relative;
        @media (max-width: 550px) {
            width: 90%;
        }
        h1 {
            display: flex;
            flex-direction: column;
            letter-spacing: 1px;
            margin-bottom: 1rem;
            font-size: 2rem;
        }
        p {
            margin: 0.5rem 0;
            font-size: 0.9rem;
            letter-spacing: 0.75px;
        }
    }

    .overlay {
        background-color: rgba(#3d3d3d, 0.7);
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
    }

    .inputWrapper {
        width: 70%;
        margin: 0 auto;
        margin-top: 1rem;

        .disabled {
            border: 2px solid #979797;
            background: rgba(#979797, 0.05);
            color: #979797;
        }

        svg {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            cursor: pointer;
        }
        .title {
            padding: 0;
            margin: 0;
            text-align: center;
            font-size: 1rem;
            margin-top: 0.2rem;
        }
        @media (max-width: 550px) {
            width: 90%;
        }
    }

    .back {
        all: unset;
        height: 25px;
        padding: 3px;
        margin: 0 auto;
        background-color: #3d3d3d;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: 2px solid #3d3d3d;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        user-select: none;
        margin-bottom: 0.5rem;
        &:hover {
            color: #3d3d3d;
            background: white;
        }
        @media (max-width: 550px) {
            width: 90%;
        }
    }

    .poland {
        width: 100%;
        margin: 0;
        font-weight: 600;
        color: #979797;
        position: absolute;
        bottom: 8px;
        font-size: 0.7rem;
        left: 50%;
        transform: translateX(-50%);
        span {
            color: #e74c3c;
        }
    }
}
</style>
