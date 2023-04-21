import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import OnlyVideo from '../views/OnlyVideo.vue';
import Mobile from '../views/Mobile.vue';
import SettingsRTH from '../views/SettingsRTH.vue';
import SettingsGeofence from '../views/SettingsGeofence.vue';
import SettingsCamera from '../views/SettingsCamera.vue';
import Home from '../views/Home.vue';
import Health from '../views/Health.vue';
import Statistics from '../views/Statistics.vue';
import SettingsAutonomous from '../views/SettingsAutonomous.vue';
import SettingsGamepad from '../views/SettingsGamepad.vue';

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
        path: '/only-video',
        name: 'OnlyVideo',
        component: OnlyVideo,
    },
    {
        path: '/mobile',
        name: 'Mobile',
        component: Mobile,
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
        path: '/settings/camera',
        name: 'SettingsCamera',
        component: SettingsCamera,
    },
    {
        path: '/settings/autonomous',
        name: 'SettingsAutonomous',
        component: SettingsAutonomous,
    },
    {
        path: '/settings/gamepad',
        name: 'SettingsGamepad',
        component: SettingsGamepad,
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
