<template>
    <div class="heading">
        <span>{{ yawDegress }}°</span>
    </div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        yawAngle: number;
    }
}

export default defineComponent({
    computed: {
        ...mapState({
            yawAngle: state => {
                return (state as Store).orientation.yaw;
            },
        }),
        yawDegress() {
            let degress = Number(
                this.variableMap(this.yawAngle, -180, 180, 0, 360).toFixed(0),
            );

            return degress;
        },
    },
    methods: {
        variableMap: (value, inMin, inMax, outMin, outMax) =>
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin,
    },
});
</script>

<style lang="scss" scoped>
.heading {
    display: flex;
    align-items: center;
    color: white;
    font-weight: 600;
    padding: 4px 6px;
    border-radius: 5px;
    background-color: #3d3d3d;
    margin-right: 1rem;
    width: 41.5px;
    span {
        text-align: center;
        font-size: 0.8rem;
        width: 100%;
    }
}
</style>
