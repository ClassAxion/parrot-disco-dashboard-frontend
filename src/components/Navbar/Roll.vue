<template>
    <div class="roll">
        <img
            :style="`transform: rotate(${rollDegress}deg)`"
            src="./../../assets/img/roll.png"
            alt="roll"
        />
    </div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        rollAngle: number;
    }
}

export default defineComponent({
    computed: {
        ...mapState({
            rollAngle: state => {
                return (state as Store).orientation.roll;
            },
        }),
        rollDegress() {
            let degress =
                Number(
                    this.variableMap(this.rollAngle, -180, 180, 0, 360).toFixed(
                        0,
                    ),
                ) - 180;
            if (degress > 360) degress -= 360;
            if (degress < 0) degress = 360 - degress * -1;

            return 360 - degress;
        },
    },
    methods: {
        variableMap: (value, inMin, inMax, outMin, outMax) =>
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin,
    },
});
</script>

<style lang="scss" scoped>
.roll {
    margin-right: 1rem;
    img {
        width: 50px;
    }
}
</style>
