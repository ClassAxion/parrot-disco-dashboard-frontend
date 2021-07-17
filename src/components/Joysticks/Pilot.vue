<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        x: number;
        y: number;
        speed: number;
        isMouseDown: boolean;
        timeout: any;
        alreadySentZero: boolean;
        setPiloting: Function;
    }
}

export default defineComponent({
    data() {
        return {
            x: 0,
            y: 0,
            speed: 0,
            isMouseDown: false,
            timeout: null,
        };
    },
    computed: {
        ...mapState({
            isPitchEnabled: (state: any) => state.permission.canPilotingPitch,
            isRollEnabled: (state: any) => state.permission.canPilotingRoll,
            tiltMaxSpeed: (state: any) => state.camera.maxTiltSpeed,
            panMaxSpeed: (state: any) => state.camera.maxPanSpeed,
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
        ...mapActions({
            updatePiloting: 'updatePiloting',
        }),
        handleStart() {
            this.isMouseDown = true;
            clearTimeout(this.timeout);
        },
        handleTouch({ touches: [touch] }) {
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
            const x = Math.round(clientX - offsetLeft - 64);
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
            if (!this.isPitchEnabled && !this.isRollEnabled) return;

            const offset = 64 - 16;
            const radians = Math.atan2(y, x);
            this.speed = Math.min(
                Math.round(Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2))),
                64,
            );

            const deadBand: number = 7;

            if (this.isRollEnabled) {
                const rawX: number =
                    this.speed > offset ? Math.cos(radians) * offset : x;

                this.x = rawX < deadBand && rawX > deadBand * -1 ? 0 : rawX;
            }

            if (this.isPitchEnabled) {
                const rawY: number =
                    this.speed >= offset ? Math.sin(radians) * offset : y;

                this.y = rawY < deadBand && rawY > deadBand * -1 ? 0 : rawY;
            }

            if (!this.x && !this.y) {
                if (this.alreadySentZero) return;

                this.alreadySentZero = true;
            } else {
                this.alreadySentZero = false;
            }

            const pitch: number = Number(
                this.variableMap(
                    this.parseValue(this.y, -45, 45),
                    -45,
                    45,
                    -75,
                    75,
                ).toFixed(0),
            );

            const roll: number = Number(
                this.variableMap(
                    this.parseValue(this.x, -45, 45),
                    -45,
                    45,
                    -75,
                    75,
                ).toFixed(0),
            );

            this.updatePiloting({ roll, pitch });
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
    box-sizing: border-box;
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
        background-image: url('./../../assets/img/control.svg');
        background-repeat: no-repeat;
        background-position: center;
    }
    &:hover {
        opacity: 1;
    }
}
</style>
