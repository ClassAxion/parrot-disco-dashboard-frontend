<template>
    <button @click="onClick">Disconnect</button>
</template>

<script lang="ts">
import { Socket } from 'socket.io-client';
import { defineComponent } from 'vue';
import { Instance as Peer } from 'simple-peer';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        socket: Socket;
        peer: Peer;
    }
}

export default defineComponent({
    inject: ['socket', 'peer'],
    methods: {
        onClick() {
            this.socket.disconnect();
            this.peer.destroy();

            window.location.href = '/';
        },
    },
});
</script>
