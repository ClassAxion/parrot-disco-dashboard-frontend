<template>
    <button @click="onClick">Disconnect</button>
</template>

<script lang="ts">
import { Socket } from 'socket.io-client';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        socket: Socket;
    }
}

export default {
    inject: ['socket'],
    methods: {
        onClick() {
            this.socket.disconnect();

            this.$router.push('/');
        },
    },
};
</script>
