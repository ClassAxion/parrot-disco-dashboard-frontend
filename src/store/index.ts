import { Socket } from 'socket.io-client';
import { createStore, Store } from 'vuex';

import { Store as StoreInfo } from '@/interfaces/Store';
import { Instance as Peer } from 'simple-peer';
import { Permission } from '@/interfaces/Permission';

export default function(socket: Socket, peer: Peer): Store<StoreInfo> {
    const store: Store<StoreInfo> = createStore({
        state: {
            isConnected: false,
            stream: null,
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
            network: {
                latency: 0,
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

    socket.on('signal', data => peer.signal(data));

    peer.on('stream', stream => (store.state.stream = stream));

    peer.on('close', () => {
        socket.close();

        store.state.isConnected = false;
    });

    const sendPacket = (packet: any) => peer.send(JSON.stringify(packet));

    peer.on('data', data => {
        const packet = JSON.parse(data.toString());

        if (packet.action === 'ping') {
            sendPacket({ action: 'pong', data: packet.data });
        } else if (packet.action === 'latency') {
            const latency: number = packet.data;

            store.state.network.latency = latency;
        } else if (packet.action === 'battery') {
            const { percent } = packet.data;

            store.state.battery.percent = percent;
        } else if (packet.action === 'state') {
            const {
                flyingTime,
                flyingState,
                canTakeOff,
                isDiscoConnected,
            } = packet.data;

            if (flyingTime !== undefined) {
                store.state.state.flyingTime = flyingTime;
            }

            if (flyingState !== undefined) {
                store.state.state.flyingState = flyingState;
            }

            if (canTakeOff !== undefined) {
                store.state.state.canTakeOff = canTakeOff;
            }

            if (isDiscoConnected !== undefined) {
                store.state.state.isDiscoConnected = isDiscoConnected;
            }
        } else if (packet.action === 'permission') {
            const permission: Permission = packet.data;

            store.state.permission = permission;
        } else if (packet.action === 'gps') {
            const { isFixed, satellites, location } = packet.data;

            if (isFixed !== undefined) {
                store.state.gps.isFixed = isFixed;
            }

            if (satellites !== undefined) {
                store.state.gps.availableSatellites = satellites;
            }

            if (location !== undefined) {
                store.state.gps.latitude = location.lat;
                store.state.gps.longitude = location.lon;
            }
        } else if (packet.action === 'attitude') {
            const { pitch, roll, yaw } = packet.data;

            store.state.orientation.pitch = pitch;
            store.state.orientation.roll = roll;
            store.state.orientation.yaw = yaw;
        } else if (packet.action === 'altitude') {
            const { altitude } = packet.data;

            store.state.orientation.altitude = altitude;
        } else if (packet.action === 'speed') {
            const speed = packet.data;

            store.state.orientation.speed = speed;
        } else if (packet.action === 'camera') {
            const { maxSpeed, orientation } = packet.data;

            if (maxSpeed !== undefined) {
                store.state.camera.maxPanSpeed = maxSpeed.cameraMaxPanSpeed;
                store.state.camera.maxTiltSpeed = maxSpeed.cameraMaxTiltSpeed;
            }

            if (orientation !== undefined) {
                store.state.camera.currentPanPosition = orientation.pan;
                store.state.camera.currentTiltPosition = orientation.tilt;
            }
        }
    });

    return store;
}
