import { Socket } from 'socket.io-client';
import { createStore, Store } from 'vuex';

import { Store as StoreInfo } from '@/interfaces/Store';

export default function(socket: Socket): Store<StoreInfo> {
    const store: Store<StoreInfo> = createStore({
        state: {
            isConnected: false,
            battery: {
                percent: 0,
                voltage: 0,
            },
            camera: {
                tilt: 0,
                pan: 0,
                currentTiltPosition: 0,
                currentPanPosition: 0,
                maxTiltSpeed: 0,
                maxPanSpeed: 0,
            },
            gps: {
                latitude: 0,
                longitude: 0,
                altitude: 0,
                isFixed: false,
                availableSatellites: 0,
            },
            health: {
                magnetoCalibrationRequired: false,
                imuState: true,
                barometerState: true,
                ultrasoundState: true,
                gpsState: true,
                magnetometerState: true,
                verticalCameraState: true,
                motorState: true,
            },
            home: {
                latitude: 0,
                longitude: 0,
                altitude: 0,
                isUsing: false,
            },
            orientation: {
                pitch: 0,
                roll: 0,
                yaw: 0,
                speed: 0,
                airSpeed: 0,
                altitude: 0,
            },
            permission: {
                isSuperUser: false,
                canPilotingPitch: false,
                canPilotingRoll: false,
                canMoveCamera: false,
                canUseAutonomy: false,
            },
            piloting: {
                pitch: 0,
                roll: 0,
                throttle: 0,
            },
            rth: {
                delay: 0,
                homeType: '',
            },
            state: {
                flyingState: 0,
                canTakeOff: false,
                isDiscoConnected: false,
                flyingTime: 0,
            },
        },
        mutations: {},
        actions: {},
    });

    socket.on('connect', () => (store.state.isConnected = true));
    socket.on('disconnect', () => (store.state.isConnected = false));

    return store;
}
