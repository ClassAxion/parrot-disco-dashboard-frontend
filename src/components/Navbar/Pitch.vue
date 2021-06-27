<template>
    <div class="pitch">
        <img
            :style="`transform: rotate(${pitchDegress}deg)`"
            src="./../../assets/img/pitch.png"
            alt="pitch"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        pitchAngle: number;
    }
}

export default defineComponent({
    computed: {
        ...mapState({
            pitchAngle: (state: any) => {
                return state.orientation.pitch;
            },
        }),
        pitchDegress() {
            let degress =
                Number(
                    this.variableMap(
                        this.pitchAngle,
                        -180,
                        180,
                        0,
                        360,
                    ).toFixed(0),
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
.pitch {
    margin-right: 1rem;
    img {
        width: 50px;
    }
}
</style>
