import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Toast, { PluginOptions, POSITION } from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

const options: PluginOptions = {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    closeButton: false,
    hideProgressBar: true,
    icon: false,
    toastClassName: ['myToast'],
};

const app = createApp(App);

app.use(store);
app.use(router);

app.use(Toast, options);

app.mount('#app');
