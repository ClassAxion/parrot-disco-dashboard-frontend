import { Socket } from 'socket.io-client';
import { createStore, Store } from 'vuex';

import { Store as StoreInfo } from '@/interfaces/Store';
import { Instance as Peer } from 'simple-peer';
import { useToast } from 'vue-toastification';
import { PacketUpdate } from '@/modules/ParrotDiscoGlobalMap';

export default function(socket: Socket, peer: Peer): Store<StoreInfo> {
    const toast = useToast();

    const store: Store<StoreInfo> = createStore({
        state: {
            flights: {},
            isConnected: false,
            isGamePadActive: false,
            animationFrame: 0,
            stream: null,
            user: {
                username: '',
                token: '',
                view: '',
            },
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
                pictureFormat: 'unknown',
                autoWhiteBalance: 'unknown',
                exposition: { value: 0, min: -1.5, max: 1.5 },
                saturation: { value: 0, min: -100, max: 100 },
                videoStabilization: 'unknown',
                videoRecordingMode: 'unknown',
                videoFramerate: 'unknown',
                videoResolutions: 'unknown',
                streamMode: 'unknown',
                isRecording: false,
                canTakePicture: true,
            },
            gps: {
                latitude: 0,
                longitude: 0,
                altitude: 0,
                isFixed: false,
                availableSatellites: 0,
            },
            health: {
                magnetoCalibrationRequired: true,
                pitotCalibrationRequired: true,
                imuState: false,
                barometerState: false,
                ultrasonicState: false,
                gpsState: false,
                magnetometerState: false,
                verticalCameraState: false,
                motorState: false,
                flightPlanAvailability: false,
            },
            home: {
                latitude: 0,
                longitude: 0,
                latitudeWanted: 0,
                longitudeWanted: 0,
                altitude: 0,
                typeWanted: 'UNKNOWN',
                typeChosen: 'UNKNOWN',
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
                canPilotingThrottle: false,
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
                inProgress: false,
            },
            state: {
                flyingState: 0,
                isDiscoConnected: false,
                flyingTime: 0,
            },
            stats: {
                nbFlights: 0,
                lastFlightDuration: 0,
                totalFlightDuration: 0,
                massStorageSize: 0,
                massStorageUsedSize: 0,
            },
            geofence: {
                isEnabled: false,
            },
        },
        mutations: {
            setZeroThrottle(state: StoreInfo) {
                state.piloting.throttle = 0;
            },
            setPiloting(
                state: StoreInfo,
                piloting: { pitch?: number; roll?: number; throttle?: number },
            ) {
                if (piloting.pitch !== undefined) {
                    state.piloting.pitch = piloting.pitch;
                }

                if (piloting.roll !== undefined) {
                    state.piloting.roll = piloting.roll;
                }

                if (piloting.throttle !== undefined) {
                    state.piloting.throttle = piloting.throttle;
                }
            },
            updateWantedHome(
                state: StoreInfo,
                data: { latitude: number; longitude: number },
            ) {
                state.home.latitudeWanted = data.latitude;
                state.home.longitudeWanted = data.longitude;
            },
            updateFlight(state: StoreInfo, data: PacketUpdate) {
                const url = window.location.href;

                const myId = (url.split('//flight').pop() || '0').slice(0, 1);

                if (data.id == myId) return;

                const exists: boolean = !!state.flights[data.id];

                if (!exists) {
                    state.flights[data.id] = {
                        ...data,
                        updatedAt: Date.now(),
                    };
                } else {
                    if (!!data.altitude)
                        state.flights[data.id].altitude = data.altitude;

                    if (!!data.angle) state.flights[data.id].angle = data.angle;

                    if (!!data.location)
                        state.flights[data.id].location = data.location;

                    if (!!data.speed) state.flights[data.id].speed = data.speed;

                    state.flights[data.id].updatedAt = Date.now();
                }
            },
            removeExpiredFlights(state: StoreInfo) {
                const ids: string[] = Object.keys(state.flights);
                const timeoutMs: number = 30000;

                for (const id of ids) {
                    if (Date.now() - state.flights[id].updatedAt > timeoutMs) {
                        delete state.flights[id];
                    }
                }
            },
        },
        actions: {
            updatePiloting(
                { commit },
                piloting: { pitch?: number; roll?: number; throttle?: number },
            ) {
                commit('setPiloting', piloting);
            },
            updateWantedHome(
                { commit },
                data: { latitude: number; longitude: number },
            ) {
                commit('updateWantedHome', data);
            },
            setZeroThrottle({ commit }) {
                commit('setZeroThrottle');
            },
        },
    });

    store.watch(
        function(state) {
            return state.piloting;
        },
        function(piloting: { pitch: number; roll: number; throttle: number }) {
            peer.send(
                JSON.stringify({
                    action: 'move',
                    data: {
                        pitch: piloting.pitch,
                        roll: piloting.roll,
                        throttle: piloting.throttle,
                    },
                }),
            );
        },
        {
            deep: true,
        },
    );

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

        if (packet.action === 'init') {
            sendPacket({
                action: 'init',
                data: {
                    username: store.state.user.username,
                    token: store.state.user.token,
                    view: store.state.user.view,
                },
            });
        } else if (packet.action === 'alert') {
            if (typeof packet.data === 'string') {
                console.info(packet.data);
            } else {
                const { level, message } = packet.data;

                switch (level) {
                    case 'danger':
                    case 'error':
                        toast.error(message);
                        break;
                    case 'warning':
                        toast.warning(message);
                        break;
                    case 'success':
                        toast.success(message);
                        break;
                    default:
                    case 'info':
                        toast.info(message);
                        break;
                }
            }
        } else if (packet.action === 'ping') {
            sendPacket({ action: 'pong', data: packet.data });
        } else if (packet.action === 'latency') {
            const latency: number = packet.data;

            store.state.network.latency = latency;
        } else if (packet.action === 'battery') {
            const { percent } = packet.data;

            store.state.battery.percent = percent;
        } else if (packet.action === 'state') {
            const { flyingTime, flyingState, isDiscoConnected } = packet.data;

            if (flyingTime !== undefined) {
                store.state.state.flyingTime = flyingTime;
            }

            if (flyingState !== undefined) {
                store.state.state.flyingState = flyingState;
            }

            if (isDiscoConnected !== undefined) {
                store.state.state.isDiscoConnected = isDiscoConnected;
            }
        } else if (packet.action === 'permission') {
            const {
                isSuperUser,
                canPilotingPitch,
                canPilotingRoll,
                canPilotingThrottle,
                canMoveCamera,
                canUseAutonomy,
            } = packet.data;

            if (isSuperUser !== undefined) {
                store.state.permission.isSuperUser = isSuperUser;
            }

            if (canPilotingPitch !== undefined) {
                store.state.permission.canPilotingPitch = canPilotingPitch;
            }

            if (canPilotingRoll !== undefined) {
                store.state.permission.canPilotingRoll = canPilotingRoll;
            }

            if (canPilotingThrottle !== undefined) {
                store.state.permission.canPilotingThrottle = canPilotingThrottle;
            }

            if (canMoveCamera !== undefined) {
                store.state.permission.canMoveCamera = canMoveCamera;
            }

            if (canUseAutonomy !== undefined) {
                store.state.permission.canUseAutonomy = canUseAutonomy;
            }
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
            //const { altitude } = packet.data;

            store.state.orientation.altitude = packet.data;
        } else if (packet.action === 'speed') {
            const speed = packet.data;

            store.state.orientation.speed = speed;
        } else if (packet.action === 'camera') {
            const {
                maxSpeed,
                orientation,
                pictureFormat,
                autoWhiteBalance,
                exposition,
                saturation,
                timelapse,
                videoStabilization,
                videoRecordingMode,
                videoFramerate,
                videoResolutions,
                streamMode,
                isRecording,
                canTakePicture,
            } = packet.data;

            if (isRecording !== undefined)
                store.state.camera.isRecording = isRecording;

            if (canTakePicture !== undefined)
                store.state.camera.canTakePicture = canTakePicture;

            if (!!pictureFormat)
                store.state.camera.pictureFormat = pictureFormat;

            if (!!autoWhiteBalance)
                store.state.camera.autoWhiteBalance = autoWhiteBalance;

            if (exposition !== undefined)
                store.state.camera.exposition = exposition;

            if (saturation !== undefined)
                store.state.camera.saturation = saturation;

            if (!!timelapse) store.state.camera.timelapse = timelapse;

            if (!!videoStabilization)
                store.state.camera.videoStabilization = videoStabilization;

            if (!!videoRecordingMode)
                store.state.camera.videoRecordingMode = videoRecordingMode;

            if (!!videoFramerate)
                store.state.camera.videoFramerate = videoFramerate;

            if (!!videoResolutions)
                store.state.camera.videoResolutions = videoResolutions;

            if (!!streamMode) store.state.camera.streamMode = streamMode;

            if (maxSpeed !== undefined) {
                store.state.camera.maxPanSpeed = maxSpeed.maxPanSpeed;
                store.state.camera.maxTiltSpeed = maxSpeed.maxTiltSpeed;
            }

            if (orientation !== undefined) {
                store.state.camera.currentPanPosition = orientation.pan;
                store.state.camera.currentTiltPosition = orientation.tilt;
            }
        } else if (packet.action === 'health') {
            const {
                magnetoCalibrationRequired,
                pitotCalibrationRequired,
                imuState,
                barometerState,
                ultrasonicState,
                gpsState,
                magnetometerState,
                verticalCameraState,
                flightPlanAvailability,
            } = packet.data;

            if (magnetoCalibrationRequired !== undefined)
                store.state.health.magnetoCalibrationRequired = magnetoCalibrationRequired;

            if (pitotCalibrationRequired !== undefined)
                store.state.health.pitotCalibrationRequired = pitotCalibrationRequired;

            if (imuState !== undefined) store.state.health.imuState = imuState;

            if (barometerState !== undefined)
                store.state.health.barometerState = barometerState;

            if (ultrasonicState !== undefined)
                store.state.health.ultrasonicState = ultrasonicState;

            if (gpsState !== undefined) store.state.health.gpsState = gpsState;

            if (magnetometerState !== undefined)
                store.state.health.magnetometerState = magnetometerState;

            if (verticalCameraState !== undefined)
                store.state.health.verticalCameraState = verticalCameraState;

            if (flightPlanAvailability !== undefined)
                store.state.health.flightPlanAvailability = flightPlanAvailability;
        } else if (packet.action === 'home') {
            const {
                latitude,
                longitude,
                altitude,
                typeWanted,
                typeChosen,
            } = packet.data;

            if (latitude !== undefined) {
                store.state.home.latitude = latitude;
            }

            if (longitude !== undefined) {
                store.state.home.longitude = longitude;
            }

            if (altitude !== undefined) {
                store.state.home.altitude = altitude;
            }

            if (typeWanted !== undefined) {
                store.state.home.typeWanted = typeWanted;
            }

            if (typeChosen !== undefined) {
                store.state.home.typeChosen = typeChosen;
            }
        } else if (packet.action === 'stats') {
            const {
                nbFlights,
                lastFlightDuration,
                totalFlightDuration,
                massStorageSize,
                massStorageUsedSize,
            } = packet.data;

            if (nbFlights !== undefined) {
                store.state.stats.nbFlights = nbFlights;
            }

            if (lastFlightDuration !== undefined) {
                store.state.stats.lastFlightDuration = lastFlightDuration;
            }

            if (totalFlightDuration !== undefined) {
                store.state.stats.totalFlightDuration = totalFlightDuration;
            }

            if (massStorageSize !== undefined) {
                store.state.stats.massStorageSize = massStorageSize;
            }

            if (massStorageUsedSize !== undefined) {
                store.state.stats.massStorageUsedSize = massStorageUsedSize;
            }
        } else if (packet.action === 'geofence') {
            const {
                maxAltitude,
                minAltitude,
                maxDistance,
                circlingAltitude,
                isEnabled,
            } = packet.data;

            if (maxAltitude !== undefined)
                store.state.geofence.maxAltitude = maxAltitude;

            if (minAltitude !== undefined)
                store.state.geofence.minAltitude = minAltitude;

            if (maxDistance !== undefined)
                store.state.geofence.maxDistance = maxDistance;

            if (circlingAltitude !== undefined)
                store.state.geofence.circlingAltitude = circlingAltitude;

            if (isEnabled !== undefined)
                store.state.geofence.isEnabled = isEnabled;
        } else if (packet.action === 'rth') {
            const { inProgress } = packet.data;

            if (inProgress !== undefined)
                store.state.rth.inProgress = inProgress;
        }
    });

    const buttonMap: { [key: string]: number } = {
        'map-auto-move': 0,
        'circle-ccw': 16,
        'circle-cw': 17,
        'start-rth': 18,
        'stop-rth': 19,
        'camera-center': 27,
        'take-off': 20,
        'start-flight-plan-land': 10,
        'start-flight-plan-test': 12,
    };

    const axisMap: { [key: string]: number } = {
        'camera-pan': 0,
        'camera-tilt': 1,
        'control-mode': 2,
        roll: 3,
        pitch: 4,
        'control-mode-inverted': 5,
    };

    const variableMap = (value, inMin, inMax, outMin, outMax) =>
        ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    const lastSentCameraMovement: { tilt: number; pan: number } = {
        tilt: 0,
        pan: 0,
    };

    let lastAction: string = '';

    const timings: { [key: string]: number } = {};

    const run = () => {
        if (!store.state.isGamePadActive) return;

        const gamepadsRaw = navigator.getGamepads();

        if (!gamepadsRaw) return;

        const gamepads = Array.from(gamepadsRaw).filter(Boolean);

        if (!gamepads || gamepads.length === 0 || !gamepads[0]) return;

        const gamepad: Gamepad = gamepads[0];

        const buttons = gamepad.buttons;

        for (const buttonIdRaw in buttons) {
            const button: GamepadButton = buttons[buttonIdRaw];

            const buttonId: number = Number(buttonIdRaw);

            const timing: number = timings['b-' + buttonId];

            if (button.pressed && (!timing || Date.now() - timing > 500)) {
                timings['b-' + buttonId] = Date.now();

                if (buttonId === buttonMap['camera-center']) {
                    peer.send(JSON.stringify({ action: 'camera-center' }));
                }

                if (buttonId === buttonMap['take-off']) {
                    peer.send(JSON.stringify({ action: 'takeOff' }));
                }

                if (buttonId === buttonMap['circle-ccw']) {
                    peer.send(
                        JSON.stringify({ action: 'circle', data: 'CCW' }),
                    );
                }

                if (buttonId === buttonMap['circle-cw']) {
                    peer.send(JSON.stringify({ action: 'circle', data: 'CW' }));
                }

                if (buttonId === buttonMap['map-auto-move']) {
                    // TODO
                }

                if (buttonId === buttonMap['start-flight-plan-land']) {
                    peer.send(
                        JSON.stringify({
                            action: 'flightPlanStart',
                            data: 'land',
                            force: true,
                        }),
                    );
                }

                if (buttonId === buttonMap['start-flight-plan-test']) {
                    peer.send(
                        JSON.stringify({
                            action: 'flightPlanStart',
                            data: 'test',
                            force: true,
                        }),
                    );
                }

                if (buttonId === buttonMap['start-rth']) {
                    peer.send(JSON.stringify({ action: 'rth', data: true }));
                }

                if (buttonId === buttonMap['stop-rth']) {
                    peer.send(JSON.stringify({ action: 'rth', data: false }));
                }
            }
        }

        const axes = gamepad.axes;

        const isCameraMovement = axes[axisMap['control-mode']] === 1;

        if (isCameraMovement) {
            if (lastAction !== 'camera') {
                store.state.piloting.pitch = 0;
                store.state.piloting.roll = 0;

                lastAction = 'camera';
            }

            let tiltRaw: number = axes[axisMap['camera-tilt']];
            let panRaw: number = axes[axisMap['camera-pan']];

            if (tiltRaw < 0.01 && tiltRaw > -0.01) tiltRaw = 0;
            if (panRaw < 0.01 && panRaw > -0.01) panRaw = 0;

            const tilt: number = Number(
                variableMap(tiltRaw, -1, 1, -20, 20).toFixed(0),
            );

            const pan: number = Number(
                variableMap(panRaw, -1, 1, -20, 20).toFixed(0),
            );

            if (
                lastSentCameraMovement.tilt !== tilt ||
                lastSentCameraMovement.pan !== pan
            ) {
                lastSentCameraMovement.tilt = tilt;
                lastSentCameraMovement.pan = pan;

                store.state.camera.pan = pan;
                store.state.camera.tilt = tilt;

                peer.send(
                    JSON.stringify({
                        action: 'camera',
                        data: { type: 'degrees', tilt, pan },
                    }),
                );
            }
        } else {
            if (lastAction !== 'drone') {
                store.state.piloting.pitch = 0;
                store.state.piloting.roll = 0;

                lastAction = 'drone';
            }

            let rollRaw: number = axes[axisMap.roll];
            let pitchRaw: number = axes[axisMap.pitch];

            if (rollRaw < 0.01 && rollRaw > -0.01) rollRaw = 0;
            if (pitchRaw < 0.01 && pitchRaw > -0.01) pitchRaw = 0;

            const roll: number = Number(
                variableMap(rollRaw, -1, 1, -75, 75).toFixed(0),
            );

            const pitch: number = Number(
                variableMap(pitchRaw, -1, 1, -75, 75).toFixed(0),
            );

            /*
            peer.send(
                JSON.stringify({
                    action: 'move',
                    data: { pitch, roll },
                }),
            );
            */

            store.commit('setPiloting', { pitch, roll });
        }

        store.state.animationFrame = requestAnimationFrame(run);
    };

    window.addEventListener('gamepadconnected', (ev: Event) => {
        const e = ev as GamepadEvent;

        const o: Gamepad | null = navigator.getGamepads()[e.gamepad.index];

        if (!o) return;

        const gamepad: Gamepad = o;

        if (
            gamepad.id.includes('0738') &&
            gamepad.id.includes('2218') &&
            !store.state.isGamePadActive
        ) {
            store.state.isGamePadActive = true;

            store.state.animationFrame = requestAnimationFrame(run);
        } else {
            console.error(
                `Got invalid gamepad: ${gamepad.id} with index ${gamepad.index}`,
            );
        }
    });

    window.addEventListener('gamepaddisconnected', () => {
        store.state.isGamePadActive = false;

        peer.send(
            JSON.stringify({
                action: 'move',
                data: { pitch: 0, roll: 0 },
            }),
        );
    });

    return store;
}
