<template>
    <div class="camera">
        <video :src="setVideo" loop autoplay></video>
    </div>
</template>

<script>
import Video from '@/assets/video/bg.mp4';
export default {
    computed: {
        setVideo() {
            return Video;
        },
    },
};
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
