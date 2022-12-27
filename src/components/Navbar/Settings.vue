<template>
    <div class="settings" @click="toggleShow" :class="isEnabledClass">
        <span><img src="./../../assets/img/settings.svg" alt="settings"/></span>
        <ul class="options" v-if="show">
            <li
                v-for="item of items"
                :key="item.name"
                @click="navigate(item.path)"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import router from '@/router';
import { Instance as Peer } from 'simple-peer';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        peer: Peer;
        isEnabled: boolean;
    }
}

export default defineComponent({
    inject: ['peer'],
    data() {
        return {
            show: false,
            items: [
                {
                    name: 'RTH',
                    path: '/settings/rth',
                },
                {
                    name: 'Camera',
                    path: '/settings/camera',
                },
            ],
        };
    },
    computed: {
        ...mapState({
            isEnabled: state => (state as Store).permission.isSuperUser,
        }),
        isEnabledClass() {
            return this.isEnabled ? '' : 'disabled';
        },
    },
    methods: {
        toggleShow() {
            if (!this.isEnabled) return;

            this.show = !this.show;
        },
        navigate(path: string) {
            router.push(path);
        },
    },
});
</script>

<style lang="scss" scoped>
.settings {
    margin: 0 1rem;
    box-sizing: border-box;
    color: #ffffff;
    font-weight: 600;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    border-radius: 5px;
    position: relative;
    font-size: 0.8rem;
    cursor: pointer;
    user-select: none;
    transition: 0.2s all ease-in-out;
    span {
        width: calc(100% - 16px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }
    .options {
        position: absolute;
        top: 120%;
        right: 0;
        width: 200%;
        list-style: none;
        li {
            background: rgba(#3d3d3d, 0.8);
            font-size: 0.8rem;
            line-height: 1.5rem;
            padding: 0 8px;
            transition: all 0.2s ease-in-out;
            text-align: left;
            cursor: pointer;
            &:hover {
                background: white;
            }
            a {
                text-decoration: none;
                color: #ffffff;
            }
            a:hover {
                color: #3d3d3d;
            }
        }
    }
}
</style>
