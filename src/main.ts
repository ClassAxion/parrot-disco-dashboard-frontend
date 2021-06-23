import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { io } from 'socket.io-client';
import axios from 'axios';
import SimplePeer from 'simple-peer';

import Toast, { PluginOptions, POSITION } from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

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

app.use(store(socket, peer));
app.use(router);

app.use(Toast, options);

app.mount('#app');
