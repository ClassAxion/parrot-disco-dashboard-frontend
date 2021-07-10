import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { io } from 'socket.io-client';
import axios from 'axios';
import SimplePeer from 'simple-peer';
import { Store } from 'vuex';
import Toast, { PluginOptions, POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { Store as StoreInfo } from '@/interfaces/Store';
import ParrotDiscoGlobalMap from './modules/ParrotDiscoGlobalMap';

axios.defaults.baseURL = '/api/';

const socket = io({
    path: '/socket/',
    autoConnect: false,
});

const peer: SimplePeer.Instance = new SimplePeer();

peer.on('signal', signal => socket.emit('signal', signal));

const options: PluginOptions = {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    closeButton: false,
    hideProgressBar: true,
    icon: false,
};

const app = createApp(App);

app.provide('socket', socket);
app.provide('peer', peer);

socket.on('disconnect', () => {
    window.location.href = '/';
});

const mainStore: Store<StoreInfo> = store(socket, peer);

const globalMap: ParrotDiscoGlobalMap = new ParrotDiscoGlobalMap(mainStore);

app.use(mainStore);
app.use(router);

app.use(Toast, options);

app.mount('#app');
