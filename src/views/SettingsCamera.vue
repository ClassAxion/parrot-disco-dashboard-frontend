<template>
    <div class="camera">
        <Background />
        <form>
            <h1>Camera</h1>
            <router-link to="/dashboard" class="back"
                >Back to flight</router-link
            >

            <div class="inputWrapper">
                <p class="title">
                    Exposition
                    <small
                        >[min <strong>{{ camera.exposition.min }}</strong> max
                        <strong>{{ camera.exposition.max }}</strong
                        >]</small
                    >
                </p>
                <input
                    type="number"
                    v-model="camera.exposition.value"
                    @focusout="e => saveFromInput(e, 'exposition')"
                />
            </div>

            <div class="inputWrapper">
                <p class="title">
                    Saturation
                    <small
                        >[min <strong>{{ camera.saturation.min }}</strong> max
                        <strong>{{ camera.saturation.max }}</strong
                        >]</small
                    >
                </p>
                <input
                    type="number"
                    v-model="camera.saturation.value"
                    @focusout="e => saveFromInput(e, 'saturation')"
                />
            </div>

            <div class="inputWrapper">
                <p class="title">Picture format</p>
                <div
                    class="select"
                    @click="
                        pictureFormat.showValues = !pictureFormat.showValues
                    "
                >
                    <span>{{ camera.pictureFormat }}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#3d3d3d"
                            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M7,10L12,15L17,10H7Z"
                        />
                    </svg>
                    <ul class="values" v-if="pictureFormat.showValues">
                        <li
                            v-for="value in pictureFormat.values"
                            @click="save('pictureFormat', value)"
                            :key="value"
                        >
                            {{ value }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="inputWrapper">
                <p class="title">White Balance</p>
                <div
                    class="select"
                    @click="whiteBalance.showValues = !whiteBalance.showValues"
                >
                    <span>{{ camera.autoWhiteBalance }}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#3d3d3d"
                            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M7,10L12,15L17,10H7Z"
                        />
                    </svg>
                    <ul class="values" v-if="whiteBalance.showValues">
                        <li
                            v-for="value in whiteBalance.values"
                            @click="save('autoWhiteBalance', value)"
                            :key="value"
                        >
                            {{ value }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="inputWrapper">
                <p class="title">Stabilization</p>
                <div
                    class="select"
                    @click="
                        videoStabilization.showValues = !videoStabilization.showValues
                    "
                >
                    <span>{{ camera.videoStabilization }}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#3d3d3d"
                            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M7,10L12,15L17,10H7Z"
                        />
                    </svg>
                    <ul class="values" v-if="videoStabilization.showValues">
                        <li
                            v-for="value in videoStabilization.values"
                            @click="save('videoStabilization', value)"
                            :key="value"
                        >
                            {{ value }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="inputWrapper">
                <p class="title">Resolutions</p>
                <div
                    class="select"
                    @click="
                        videoResolutions.showValues = !videoResolutions.showValues
                    "
                >
                    <span>{{ camera.videoResolutions }}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#3d3d3d"
                            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M7,10L12,15L17,10H7Z"
                        />
                    </svg>
                    <ul class="values" v-if="videoResolutions.showValues">
                        <li
                            v-for="value in videoResolutions.values"
                            @click="save('videoResolutions', value)"
                            :key="value"
                        >
                            {{ value }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="inputWrapper">
                <p class="title">Framerate</p>
                <div
                    class="select"
                    @click="
                        videoFramerate.showValues = !videoFramerate.showValues
                    "
                >
                    <span>{{ camera.videoFramerate }}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#3d3d3d"
                            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M7,10L12,15L17,10H7Z"
                        />
                    </svg>
                    <ul class="values" v-if="videoFramerate.showValues">
                        <li
                            v-for="value in videoFramerate.values"
                            @click="save('videoFramerate', value)"
                            :key="value"
                        >
                            {{ value }}
                        </li>
                    </ul>
                </div>
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
import { Instance as Peer } from 'simple-peer';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        peer: Peer;
    }
}

export default defineComponent({
    inject: ['peer'],
    components: {
        Background,
    },
    data() {
        return {
            pictureFormat: {
                showValues: false,
                values: ['raw', 'jpeg', 'snapshot', 'jpeg_fisheye'],
            },
            whiteBalance: {
                showValues: false,
                values: [
                    'auto',
                    'tungsten',
                    'daylight',
                    'cloudy',
                    'cool_white',
                ],
            },
            videoStabilization: {
                showValues: false,
                values: ['roll_pitch', 'pitch', 'roll', 'none'],
            },
            videoResolutions: {
                showValues: false,
                values: ['rec1080_stream480', 'rec720_stream720'],
            },
            videoFramerate: {
                showValues: false,
                values: ['24_FPS', '25_FPS', '30_FPS'],
            },
        };
    },
    computed: {
        ...mapState({
            camera: state => (state as Store).camera,
        }),
    },
    methods: {
        save(key: string, value: any) {
            this.peer.send(
                JSON.stringify({
                    action: 'camera',
                    data: {
                        [key]: value,
                    },
                }),
            );
        },
        saveFromInput(e: FocusEvent, key: string) {
            //@ts-ignore
            const value = e.target?.value;

            this.save(key, value);
        },
    },
});
</script>

<style lang="scss" scoped>
.camera {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    form {
        background-color: white;
        width: 70vw;
        height: 90vh;
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
        .input {
            position: relative;
        }
        input {
            all: unset;
            box-sizing: border-box;
            width: 70%;
            height: 40px;
            padding-left: 1rem;
            padding-right: 2.5rem;
            letter-spacing: 1px;
            font-weight: 600;
            color: #3d3d3d;
            font-size: 0.8rem;
            border-radius: 5px;
            text-align: left;
            border: 2px solid #3d3d3d;
            transition: 0.1s all ease-in-out;
            &:focus {
                background: rgba(#3d3d3d, 0.1);
            }
        }

        .select {
            box-sizing: border-box;
            width: 70%;
            margin: 0 auto;
            height: 40px;
            padding-left: 1rem;
            padding-right: 2.5rem;
            letter-spacing: 1px;
            font-weight: 400;
            font-size: 0.8rem;
            border-radius: 5px;
            text-align: left;
            border: 2px solid #3d3d3d;
            transition: 0.1s all ease-in-out;
            margin-top: 0.2rem;
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            user-select: none;
            svg {
                position: absolute;
                right: 10px;
            }
            .values {
                z-index: 1;
                background-color: white;
                position: absolute;
                bottom: calc(-100% - 60px);
                left: 0;
                list-style: none;
                width: 100%;
                border: 2px solid rgba(#3d3d3d, 0.5);
                border-radius: 5px;
                li {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    letter-spacing: 1px;
                    padding: 0 1rem;
                    color: #3d3d3d;
                    &:hover {
                        background: rgba(#3d3d3d, 0.1);
                    }
                }
            }
            @media (max-width: 550px) {
                width: 90%;
            }
        }

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
    .save {
        all: unset;
        height: 25px;
        padding: 3px;
        margin: 1rem auto;
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
