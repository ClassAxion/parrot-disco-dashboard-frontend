import { Store } from 'vuex';
import { io, Socket } from 'socket.io-client';
import { Store as StoreInfo } from '@/interfaces/Store';

export interface PacketUpdate {
    id: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    altitude?: number;
    angle?: number;
    speed?: number;
}

export default class ParrotDiscoGlobalMap {
    private socket: Socket;

    constructor(private readonly store: Store<StoreInfo>) {
        this.socket = io({ path: '/map/' });

        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.on('connect', this.onConnect.bind(this));
        this.socket.on('reconnect', this.onConnect.bind(this));
        this.socket.on('update', this.onUpdate.bind(this));

        setInterval(this.removeExpiredFlights.bind(this), 30000);
    }

    private onConnect(): void {
        console.debug(`Parrot Disco global map connected`);
    }

    private onDisconnect(): void {
        console.debug(`Parrot Disco global map disconnected`);
    }

    private onUpdate(data: PacketUpdate): void {
        this.store.commit('updateFlight', data);
    }

    private removeExpiredFlights() {
        this.store.commit('removeExpiredFlights');
    }
}
