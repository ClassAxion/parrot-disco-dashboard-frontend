import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import SettingsRTH from '../views/SettingsRTH.vue';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/settings/rth',
        name: 'SettingsRTH',
        component: SettingsRTH,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
