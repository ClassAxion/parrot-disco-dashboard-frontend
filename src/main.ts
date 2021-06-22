import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { io } from 'socket.io-client';
import axios from 'axios';

import Toast, { PluginOptions, POSITION } from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

axios.defaults.baseURL = '/api/';

const socket = io({
    path: '/socket/',
    autoConnect: false,
});

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

app.use(store(socket));
app.use(router);

app.use(Toast, options);

app.mount('#app');
