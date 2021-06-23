<template>
    <div class="camera">
        <video :srcObject="stream" autoplay></video>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        stream: any;
    }
}

export default defineComponent({
    computed: {
        ...mapState({
            stream: (state: any) => state.stream,
        }),
    },
});
</script>

<style lang="scss" scoped>
.camera {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    video {
        min-width: 100%;
        min-height: 100%;
        margin: 0;
    }
}
</style>
