<template>
    <div class="home">
        <form>
            <h1><span>Parrot Disco</span> <span>Live Flight</span></h1>
            <!-- <p>
                You can provide your username that will be used on chat and
                select the view if you don't want default dashboard that's
                available only on screens with HD or Full HD resolution.
            </p> -->

            <div class="inputWrapper">
                <input type="text" placeholder="Username" />
                <p class="hint">optional</p>
            </div>
            <div class="inputWrapper">
                <div class="input">
                    <input
                        type="password"
                        placeholder="Token"
                        v-model="token"
                        :readonly="validToken"
                        :class="{ disabled: validToken }"
                    />
                    <svg
                        @click="checkToken"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            :fill="setFill"
                            d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
                        />
                    </svg>
                </div>
                <p class="hint">
                    {{ validToken ? 'token is valid' : 'optional' }}
                </p>
            </div>
            <div
                class="select"
                @click="showViews = !showViews"
                :style="{ color: setColor }"
            >
                <span>{{ selectedView ? selectedView : 'View' }}</span>
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
                <ul class="views" v-if="showViews">
                    <li
                        v-for="view in availableViews"
                        @click="setView(view)"
                        :key="view"
                    >
                        {{ view }}
                    </li>
                </ul>
            </div>
            <button @click="connect" type="button">connect</button>

            <p class="poland">Made with <span>❤</span> in Poland</p>
        </form>
        <video :src="setVideo" loop autoplay></video>
        <div class="overlay"></div>
    </div>
</template>

<script lang="ts">
import { useToast } from 'vue-toastification';
import { Socket } from 'socket.io-client';
import axios from 'axios';
import { defineComponent } from 'vue';
import { Store as StoreInfo } from '@/interfaces/Store';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        socket: Socket;
        $store: Store<StoreInfo>;
        selectedView: string;
        views: string[];
        token: string;
        validToken: boolean;
        isChecked: boolean;
    }
}

const Video = require('@/assets/video/bg.mp4');
const Parrot = require('@/assets/img/parrot-truncate.png');

export default defineComponent({
    inject: ['socket'],
    setup() {
        // Get toast interface
        const toast = useToast();

        // Make it available inside methods
        return { toast };
    },
    mounted() {
        this.socket.once('connect', () => {
            this.setDetails();

            switch (this.selectedView) {
                case 'Dashboard':
                    this.$router.push('/dashboard');
                    break;
                default:
                    this.toast.warning('This view is unsupported right now :(');
            }
        });
    },
    data() {
        return {
            username: '',
            views: ['Dashboard', 'Only Video'],
            showViews: false,
            selectedView: 'Dashboard',
            token: '',
            validToken: false,
            isChecked: false,
        };
    },
    computed: {
        setVideo() {
            return Video;
        },
        setImage() {
            return Parrot;
        },
        setColor() {
            return this.selectedView ? '#3d3d3d' : '#979797';
        },
        setFill() {
            if (!this.isChecked) return '#3d3d3d';
            else if (this.validToken) return '#979797';
            else if (!this.validToken) return '#e74c3c';
        },
        availableViews() {
            return this.validToken ? [...this.views, 'Take off'] : this.views;
        },
    },

    methods: {
        setView(view: string) {
            this.selectedView = view;
        },
        checkToken() {
            this.isChecked = true;

            axios
                .post('/token/check', { token: this.token })
                .then(({ data }) => {
                    this.validToken = data.status;
                })
                .catch(() => (this.validToken = false));
        },
        connect() {
            this.socket.connect();
        },
        setDetails() {
            this.$store.state.user.token = this.token;
            this.$store.state.user.username = this.username;
            this.$store.state.user.view = this.selectedView;
        },
    },
});
</script>

<style lang="scss" scoped>
.home {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    form {
        background-color: white;
        width: 500px;
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
            margin-bottom: 3rem;
            span:first-child {
                font-size: 2rem;
            }
            span:last-child {
                font-size: 0.8rem;
            }
        }
        p {
            margin: 0.5rem 0;
            font-size: 0.9rem;
            letter-spacing: 0.75px;
        }
    }
    video {
        position: absolute;
        z-index: -1;
        min-width: 100%;
        min-height: 100%;
        margin: 0;
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
            width: 100%;
            height: 50px;
            padding-left: 1rem;
            padding-right: 2.5rem;
            letter-spacing: 1px;
            font-weight: 600;
            color: #3d3d3d;
            font-size: 1rem;
            border-radius: 5px;
            text-align: left;
            border: 2px solid #3d3d3d;
            transition: 0.1s all ease-in-out;
            &:focus {
                background: rgba(#3d3d3d, 0.1);
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
        .hint {
            padding: 0;
            margin: 0;
            text-align: left;
            font-size: 0.7rem;
            margin-top: 0.2rem;
        }
        @media (max-width: 550px) {
            width: 90%;
        }
    }

    .select {
        box-sizing: border-box;
        width: 70%;
        margin: 0 auto;
        height: 50px;
        padding-left: 1rem;
        padding-right: 2.5rem;
        letter-spacing: 1px;
        font-weight: 600;
        font-size: 1rem;
        border-radius: 5px;
        text-align: left;
        border: 2px solid #3d3d3d;
        transition: 0.1s all ease-in-out;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        user-select: none;
        svg {
            position: absolute;
            right: 10px;
        }
        .views {
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
    button {
        all: unset;
        height: 50px;
        width: 70%;
        margin: 0 auto;
        margin-top: 5rem;
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
