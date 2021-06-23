<template>
    <div class="batteryWrapper" title="Battery percentage">
        <div class="battery">
            <div class="battery-level" :style="{ width: percent + '%' }"></div>
        </div>
        <span class="batteryValue">{{ percentText }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {}
}

export default defineComponent({
    computed: {
        ...mapState({
            percent: (state: any) => state.battery.percent || 0,
            percentText() {
                return !this.percent ? '?' : this.percent + '%';
            },
        }),
    },
});
</script>

<style lang="scss" scoped>
.battery {
    border: 3px solid #333;
    width: 40px;
    height: 24px;
    padding: 2px;
    border-radius: 4px;
    position: relative;
    &Wrapper {
        margin-right: 1rem;
        position: relative;
    }
    &Value {
        position: absolute;
        font-size: 0.7rem;
        font-weight: 700;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
    }

    &:before {
        content: '';
        height: 12px;
        width: 3px;
        background: #333;
        display: block;
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 4px 4px 0 0;
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 1px solid #fff;
        border-radius: 2px;
    }

    &-level {
        background: #27ae60;
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;

        &.warn {
            background-color: #efaf13;
        }

        &.alert {
            background-color: #e81309;

            // &:before {
            //     background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cg%3E%3C%2Fg%3E%20%3Cpath%20fill%3D%22%23e81309%22%20d%3D%22M17.927%2012l2.68-10.28c0.040-0.126%200.060-0.261%200.060-0.4%200-0.726-0.587-1.32-1.314-1.32-0.413%200-0.78%200.187-1.019%200.487l-13.38%2017.353c-0.18%200.227-0.287%200.513-0.287%200.827%200%200.733%200.6%201.333%201.333%201.333h8.073l-2.68%2010.28c-0.041%200.127-0.060%200.261-0.060%200.4%200.001%200.727%200.587%201.32%201.314%201.32%200.413%200%200.78-0.186%201.020-0.487l13.379-17.353c0.181-0.227%200.287-0.513%200.287-0.827%200-0.733-0.6-1.333-1.333-1.333h-8.073z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
            //     background-repeat: no-repeat;
            //     background-size: $lightning-size;
            //     height: $lightning-size;
            //     width: $lightning-size;
            //     margin: -25px 0 0 2px;
            //     content: '';
            //     display: inline-block;
            //     position: absolute;
            // }
        }
    }
}
</style>
