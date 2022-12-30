<template>
    <div class="statistics">
        <Stream />
        <form>
            <h1>Statistics</h1>
            <router-link to="/dashboard" class="back"
                >Back to flight</router-link
            >

            <div class="inputWrapper">
                <p class="title">
                    Number of flights &minus;
                    <strong>{{ stats.nbFlights }}</strong>
                </p>
                <p class="title">
                    Last flight duration &minus;
                    <strong>{{ stats.lastFlightDuration }}s</strong>
                </p>
                <p class="title">
                    Total flight duration &minus;
                    <strong>{{ stats.totalFlightDuration }}s</strong>
                </p>
                <p class="title">
                    Storage &minus;
                    <strong
                        >{{ stats.massStorageUsedSize }} /
                        {{ stats.massStorageSize }} MBytes</strong
                    >
                </p>
            </div>

            <p class="poland">Made with <span>❤</span> in Poland</p>
        </form>
        <div class="overlay"></div>
    </div>
</template>

<script lang="ts">
import Stream from '@/components/Stream/Stream.vue';
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {}
}

export default defineComponent({
    components: {
        Stream,
    },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            stats: state => (state as Store).stats,
        }),
    },
});
</script>

<style lang="scss" scoped>
.statistics {
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
