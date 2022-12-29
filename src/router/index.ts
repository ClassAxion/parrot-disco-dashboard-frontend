import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import SettingsRTH from '../views/SettingsRTH.vue';
import SettingsGeofence from '../views/SettingsGeofence.vue';
import Home from '../views/Home.vue';
import Health from '../views/Health.vue';
import Statistics from '../views/Statistics.vue';

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
        path: '/health',
        name: 'Health',
        component: Health,
    },
    {
        path: '/settings/rth',
        name: 'SettingsRTH',
        component: SettingsRTH,
    },
    {
        path: '/settings/geofence',
        name: 'SettingsGeofence',
        component: SettingsGeofence,
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
