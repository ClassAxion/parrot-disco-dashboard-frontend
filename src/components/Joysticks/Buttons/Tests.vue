<template>
    <div class="select" @click="toggleShow" :class="isEnabledClass">
        <span>{{ 'T' }}</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="16"
            height="16"
            viewBox="0 0 24 24"
        >
            <path
                fill="#FFFFFF"
                d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M17,14L12,9L7,14H17Z"
            />
        </svg>
        <ul class="options" v-if="show">
            <li v-for="test in tests" :key="test" @click="triggerTest(test)">
                {{ test }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
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
            tests: ['1', '2', '3', '4', '5'],
        };
    },
    computed: {
        ...mapState({
            isEnabled: (state: any) => state.permission.isSuperUser,
        }),
        isEnabledClass() {
            return this.isEnabled ? '' : 'disabled';
        },
    },
    methods: {
        triggerTest(name) {
            if (!this.isEnabled) return;

            this.peer.send(
                JSON.stringify({
                    action: 'test',
                    data: name,
                }),
            );
        },
        toggleShow() {
            if (!this.isEnabled) return;

            this.show = !this.show;
        },
    },
});
</script>

<style lang="scss" scoped>
.select {
    background: #3d3d3d;
    box-sizing: border-box;
    color: #ffffff;
    font-weight: 600;
    width: 50px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    border-radius: 5px;
    position: relative;
    font-size: 0.8rem;
    cursor: pointer;
    user-select: none;
    transition: 0.2s all ease-in-out;
    opacity: 0.4;
    span {
        width: calc(100% - 16px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }
    .options {
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
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
                color: #3d3d3d;
            }
        }
    }
    &:hover {
        opacity: 1;
    }
}
</style>
