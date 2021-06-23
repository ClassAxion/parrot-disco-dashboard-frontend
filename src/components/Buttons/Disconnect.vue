<template>
    <button @click="onClick">Disconnect</button>
</template>

<script lang="ts">
import { Socket } from 'socket.io-client';
import { defineComponent } from 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        socket: Socket;
    }
}

export default defineComponent({
    inject: ['socket'],
    methods: {
        onClick() {
            this.socket.disconnect();

            this.$router.push('/');
        },
    },
});
</script>
