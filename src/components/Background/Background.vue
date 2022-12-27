<template>
    <div class="image">
        <img :src="setImage" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {}
}

const Image = require('@/assets/img/background.png');

export default defineComponent({
    computed: {
        setImage() {
            return Image;
        },
    },
});
</script>

<style lang="scss" scoped>
.image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    img {
        min-width: 100%;
        min-height: 100%;
        margin: 0;
    }
}
</style>
