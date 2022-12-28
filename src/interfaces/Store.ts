import { Battery } from './Battery';
import { Camera } from './Camera';
import { GlobalMapFlight } from './GlobalMapFlight';
import { GPS } from './GPS';
import { Health } from './Health';
import { Home } from './Home';
import { Network } from './Network';
import { Orientation } from './Orientation';
import { Permission } from './Permission';
import { Piloting } from './Piloting';
import { RTH } from './RTH';
import { State } from './State';
import { Stats } from './Stats';
import { User } from './User';

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
}
