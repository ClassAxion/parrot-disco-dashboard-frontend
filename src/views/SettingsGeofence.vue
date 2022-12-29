<template>
    <div class="geofence">
        <Background />
        <form>
            <h1>Geofence</h1>
            <router-link to="/dashboard" class="back"
                >Back to flight</router-link
            >

            <div class="inputWrapper">
                <p class="title">
                    Max altitude
                    <sup
                        >[meters]
                        <span v-if="!!geofence.maxAltitude"
                            >[min {{ geofence.maxAltitude?.min }}] [max
                            {{ geofence.maxAltitude?.max }}]</span
                        ></sup
                    >
                </p>
                <input
                    type="number"
                    :value="geofence.maxAltitude?.current"
                    @change="e => saveFromChange('maxAltitude', e)"
                />
            </div>

            <div class="inputWrapper">
                <p class="title">
                    Min altitude
                    <sup
                        >[meters]
                        <span v-if="!!geofence.minAltitude"
                            >[min {{ geofence.minAltitude?.min }}] [max
                            {{ geofence.minAltitude?.max }}]</span
                        ></sup
                    >
                </p>
                <input
                    type="number"
                    :value="geofence.minAltitude?.current"
                    @change="e => saveFromChange('minAltitude', e)"
                />
            </div>

            <div class="inputWrapper">
                <p class="title">
                    Circling altitude
                    <sup
                        >[meters]
                        <span v-if="!!geofence.circlingAltitude"
                            >[min {{ geofence.circlingAltitude?.min }}] [max
                            {{ geofence.circlingAltitude?.max }}]</span
                        ></sup
                    >
                </p>
                <input
                    type="number"
                    :value="geofence.circlingAltitude?.current"
                    @change="e => saveFromChange('circlingAltitude', e)"
                />
            </div>

            <div class="inputWrapper">
                <p class="title">
                    Max distance
                    <sup
                        >[meters]
                        <span v-if="!!geofence.maxDistance"
                            >[min {{ geofence.maxDistance?.min }}] [max
                            {{ geofence.maxDistance?.max }}]</span
                        ></sup
                    >
                </p>
                <input
                    type="number"
                    :value="geofence.maxDistance?.current"
                    @change="e => saveFromChange('maxDistance', e)"
                />
            </div>

            <div class="inputWrapper">
                <p class="title">
                    Max distance works when Geofence is enabled. <br />
                    Currently geofence is
                    <strong v-if="geofence.isEnabled">enabled</strong
                    ><strong v-else>disabled</strong>
                </p>
            </div>

            <button
                type="button"
                class="enable"
                @click="() => setGeofence(true)"
                v-if="!geofence.isEnabled"
            >
                Enable geofence
            </button>
            <button
                type="button"
                class="disable"
                @click="() => setGeofence(false)"
                v-else
            >
                Disable geofence
            </button>

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
import { Geofence } from '@/interfaces/store/Geofence';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        peer: Peer;
        geofence: Geofence;
    }
}

export default defineComponent({
    inject: ['peer'],
    components: {
        Background,
    },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            geofence: state => (state as Store).geofence,
        }),
    },
    methods: {
        save(key: string, value: any) {
            this.peer.send(
                JSON.stringify({
                    action: 'geofence',
                    data: {
                        [key]: value,
                    },
                }),
            );
        },
        saveFromChange(key: string, e: Event) {
            const value = (e.target as HTMLInputElement).value;

            this.save(key, value);
        },
        setGeofence(isEnabled: boolean) {
            this.peer.send(
                JSON.stringify({
                    action: 'geofence',
                    data: {
                        isEnabled,
                    },
                }),
            );
        },
    },
});
</script>

<style lang="scss" scoped>
.geofence {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
        .footer {
            padding: 0;
            margin: 0;
            text-align: center;
            font-size: 1rem;
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

    .disable,
    .enable {
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
