<template>
    <div class="settings">
        <Background />
        <form>
            <h1>Return to home settings</h1>
            <router-link to="/dashboard" class="back"
                >Back to flight</router-link
            >

            <div class="inputWrapper">
                <p class="title">Return to home type</p>
                <div
                    class="select"
                    @click="rth.showValues = !rth.showValues"
                    :style="{ color: setColor }"
                    :title="
                        homeTypeWanted !== homeTypeChosen
                            ? 'Wanted home not chosen, you should probably submit pilot location'
                            : 'Wanted home chosen'
                    "
                >
                    <span>{{ homeTypeWanted || 'UNKNOWN' }}</span>
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
                    <ul class="values" v-if="rth.showValues">
                        <li
                            v-for="value in availableRTHValues"
                            @click="setHomeTypeWanted(value)"
                            :key="value"
                        >
                            {{ value }}
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="homeTypeWanted == 'PILOT'">
                <div class="inputWrapper">
                    <p class="title">Pilot latitude</p>
                    <input
                        type="text"
                        placeholder="53.34925"
                        v-model="home.latitude"
                        :style="{
                            color:
                                wantedHomeLocation.latitude !== home.latitude
                                    ? 'red'
                                    : 'green',
                        }"
                    />
                </div>

                <div class="inputWrapper">
                    <p class="title">Pilot longitude</p>
                    <input
                        type="text"
                        placeholder="17.64046"
                        v-model="home.longitude"
                        :style="{
                            color:
                                wantedHomeLocation.longitude !== home.longitude
                                    ? 'red'
                                    : 'green',
                        }"
                    />
                </div>

                <div class="inputWrapper">
                    <p class="title">Pilot altitude <small>[meters]</small></p>
                    <input
                        type="text"
                        placeholder="167"
                        v-model="home.altitude"
                    />
                </div>

                <button type="button" class="save" @click="submitPilotLocation">
                    Submit pilot location
                </button>

                <br />

                <button type="button" class="save" @click="refresh">
                    Refresh pilot location
                </button>
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
import { mapActions, mapState } from 'vuex';
import { Instance as Peer } from 'simple-peer';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        peer: Peer;
        rth: {
            values: string[];
            value: string;
            showValues: boolean;
        };
        home: {
            latitude: number;
            longitude: number;
            altitude: number;
        };
        homeTypeChosen: string;
        homeTypeWanted: string;
    }
}

export default defineComponent({
    inject: ['peer'],
    components: {
        Background,
    },
    data() {
        return {
            rth: {
                values: ['TAKEOFF', 'PILOT'],
                showValues: false,
            },
            home: {
                latitude: 0,
                longitude: 0,
                altitude: 0,
            },
        };
    },
    computed: {
        ...mapState({
            homeTypeWanted: state => (state as Store).home.typeWanted,
            homeTypeChosen: state => (state as Store).home.typeChosen,
            homeLocation: state => ({
                latitude: (state as Store).home.latitude,
                longitude: (state as Store).home.longitude,
                altitude: (state as Store).home.altitude,
            }),
            wantedHomeLocation: state => ({
                latitude: (state as Store).home.latitudeWanted,
                longitude: (state as Store).home.longitudeWanted,
            }),
        }),
        availableRTHValues() {
            return this.rth.values;
        },
        setColor() {
            return this.homeTypeChosen !== this.homeTypeWanted
                ? 'red'
                : 'green';
        },
    },
    methods: {
        ...mapActions({
            updateWantedHome: 'updateWantedHome',
        }),
        setHomeTypeWanted(value: string) {
            this.peer.send(
                JSON.stringify({
                    action: 'home',
                    data: {
                        typeWanted: value,
                    },
                }),
            );
        },
        submitPilotLocation() {
            if (
                this.home.latitude &&
                this.home.longitude &&
                this.home.altitude
            ) {
                this.peer.send(
                    JSON.stringify({
                        action: 'home',
                        data: {
                            latitude: this.home.latitude,
                            longitude: this.home.longitude,
                            altitude: this.home.altitude,
                        },
                    }),
                );

                this.updateWantedHome({
                    latitude: this.home.latitude,
                    longitude: this.home.longitude,
                });
            }
        },
        refresh() {
            if (!!this.homeLocation.latitude && !!this.homeLocation.longitude) {
                this.home.latitude = this.homeLocation.latitude;
                this.home.longitude = this.homeLocation.longitude;
                this.home.altitude = this.homeLocation.altitude;
            }
        },
    },
    created() {
        this.refresh();
    },
});
</script>

<style lang="scss" scoped>
.settings {
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
