<template>
    <div>
        <div
            class="joystick"
            @touchmove="handleTouch"
            @mousemove="handleMove"
            @mousedown="handleStart"
            @mouseup="handleRelease"
            @touchend="handleRelease"
            @mouseleave="handleLeave"
            :style="style"
        ></div>
    </div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { Instance as Peer } from 'simple-peer';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        peer: Peer;
        x: number;
        y: number;
        speed: number;
        isMouseDown: boolean;
        timeout: NodeJS.Timeout;
        alreadySentZero: boolean;
    }
}

export default defineComponent({
    inject: ['peer'],
    data() {
        return {
            x: 0,
            y: 0,
            speed: 0,
            isMouseDown: false,
            timeout: setTimeout(function() {}, 0),
            alreadySentZero: false,
        };
    },
    computed: {
        ...mapState({
            isEnabled: state => (state as Store).permission.canMoveCamera,
            tiltMaxSpeed: state => (state as Store).camera.maxTiltSpeed,
            panMaxSpeed: state => (state as Store).camera.maxPanSpeed,
        }),
        style() {
            return {
                '--x': `${this.x + 64}px`,
                '--y': `${this.y + 64}px`,
                '--speed': `${this.speed}px`,
            };
        },
    },
    methods: {
        handleStart() {
            this.isMouseDown = true;
            clearTimeout(this.timeout);
        },
        handleTouch(payload: TouchEvent) {
            if (payload.touches.length < 1) return;

            const touch = payload.touches[0];

            const { clientX, clientY } = touch;
            const { offsetLeft, offsetTop } = this.$el;
            const x = Math.round(clientX - offsetLeft - 64);
            const y = Math.round(clientY - offsetTop - 64);
            this.updatePosition(x, y);
        },
        handleMove({ clientX, clientY }) {
            if (!this.isMouseDown) {
                return;
            }
            const { offsetLeft, offsetTop } = this.$el;
            const x = Math.round(clientX - offsetLeft - 64 - 12);
            const y = Math.round(clientY - offsetTop - 64);
            this.updatePosition(x, y);
        },
        handleLeave() {
            this.timeout = setTimeout(() => {
                this.isMouseDown = false;
                this.updatePosition(0, 0);
            }, 1000);
        },
        handleRelease() {
            clearTimeout(this.timeout);
            this.isMouseDown = false;
            this.updatePosition(0, 0);
        },
        updatePosition(x, y) {
            if (!this.isEnabled) return;

            const offset = 64 - 16;
            const radians = Math.atan2(y, x);
            this.speed = Math.min(
                Math.round(Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2))),
                64,
            );
            this.x = this.speed > offset ? Math.cos(radians) * offset : x;
            this.y = this.speed >= offset ? Math.sin(radians) * offset : y;

            if (!this.x && !this.y) {
                if (this.alreadySentZero) return;

                this.alreadySentZero = true;
            } else {
                this.alreadySentZero = false;
            }

            const tilt: number = Number(
                this.variableMap(
                    this.parseValue(this.y, -45, 45),
                    -45,
                    45,
                    this.tiltMaxSpeed,
                    this.tiltMaxSpeed * -1,
                ).toFixed(0),
            );

            const pan: number = Number(
                this.variableMap(
                    this.parseValue(this.x, -45, 45),
                    -45,
                    45,
                    this.panMaxSpeed * -1,
                    this.panMaxSpeed,
                ).toFixed(0),
            );

            this.peer.send(
                JSON.stringify({
                    action: 'camera',
                    data: { type: 'degrees', tilt, pan },
                }),
            );
        },
        parseValue(value, min, max) {
            if (value < min) return min;
            if (value > max) return max;

            return value;
        },
        variableMap: (value, inMin, inMax, outMin, outMax) =>
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin,
    },
});
</script>

<style lang="scss" scoped>
.joystick {
    width: 128px;
    height: 128px;
    border: 2px solid #3d3d3d;
    background-color: rgba(#ffffff, 0.4);
    border-radius: 50%;
    margin: auto;
    position: relative;
    margin-bottom: 2rem;
    transition: 0.2s all ease-in-out;
    opacity: 0.4;
    &::after,
    &::before {
        content: '';
        position: absolute;
    }
    &::before {
        left: 0;
        right: 0;
        margin: -16px;
        background: #3d3d3d;
        height: 32px;
        width: 32px;
        border-radius: 50%;
        transform: translateX(var(--x)) translateY(var(--y));
        background-image: url('./../../assets/img/camera.svg');
        background-repeat: no-repeat;
        background-position: center;
    }
    &:hover {
        opacity: 1;
    }
}
</style>
