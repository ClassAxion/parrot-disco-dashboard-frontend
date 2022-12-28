import { Battery } from './store/Battery';
import { Camera } from './store/Camera';
import { GlobalMapFlight } from './GlobalMapFlight';
import { GPS } from './store/GPS';
import { Health } from './store/Health';
import { Home } from './store/Home';
import { Network } from './store/Network';
import { Orientation } from './store/Orientation';
import { Permission } from './store/Permission';
import { Piloting } from './store/Piloting';
import { RTH } from './store/RTH';
import { State } from './store/State';
import { Stats } from './store/Stats';
import { User } from './store/User';
import { Geofence } from './store/Geofence';

export interface Store {
    flights: { [key: string]: GlobalMapFlight };
    isConnected: boolean;
    isGamePadActive: boolean;
    animationFrame: number;
    stream: any;
    battery: Battery;
    camera: Camera;
    gps: GPS;
    health: Health;
    home: Home;
    network: Network;
    orientation: Orientation;
    permission: Permission;
    piloting: Piloting;
    rth: RTH;
    state: State;
    user: User;
    stats: Stats;
    geofence: Geofence;
}
