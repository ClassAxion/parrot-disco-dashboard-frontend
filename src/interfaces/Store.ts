import { Battery } from './Battery';
import { Camera } from './Camera';
import { GPS } from './GPS';
import { Health } from './Health';
import { Home } from './Home';
import { Network } from './Network';
import { Orientation } from './Orientation';
import { Permission } from './Permission';
import { Piloting } from './Piloting';
import { RTH } from './RTH';
import { State } from './State';
import { User } from './User';

export interface Store {
    isConnected: boolean;
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
}
