<template>
    <div class="time" title="Flight time">
        <span>{{ flyingTime }}</span>
    </div>
</template>

<script lang="ts">
import { Store } from '@/interfaces/Store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {}
}

export default defineComponent({
    computed: {
        ...mapState({
            flyingTime: state => {
                let seconds: number = (state as Store).state.flyingTime / 1000;

                const hours: number = Math.floor(seconds / 60 / 60);

                seconds -= hours * 60 * 60;

                const minutes: number = Math.floor(seconds / 60);

                seconds -= minutes * 60;

                seconds = Math.floor(seconds);

                return (
                    String(hours).padStart(2, '0') +
                    ':' +
                    String(minutes).padStart(2, '0') +
                    ':' +
                    String(seconds).padStart(2, '0')
                );
            },
        }),
    },
});
</script>

<style lang="scss" scoped>
.time {
    margin-right: 1rem;
    color: #ffffff;
    font-weight: 600;
}
</style>
