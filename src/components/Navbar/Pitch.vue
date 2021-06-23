<template>
    <div class="pitch">
        <img
            :style="`transform: rotate(${deg}deg)`"
            src="./../../assets/img/pitch.png"
            alt="pitch"
        />
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
            deg: (state: any) => state.orientation.pitch,
        }),
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
