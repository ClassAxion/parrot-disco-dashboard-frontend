<template>
    <div class="roll">
        <img
            :style="`transform: rotate(${deg}deg)`"
            src="./../../assets/img/roll.png"
            alt="roll"
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
            deg: (state: any) => state.orientation.roll,
        }),
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
