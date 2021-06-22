import { Battery } from './Battery';
import { Camera } from './Camera';
import { GPS } from './GPS';
import { Home } from './Home';
import { Orientation } from './Orientation';
import { Permission } from './Permission';
import { Piloting } from './Piloting';
import { RTH } from './RTH';

export interface Store {
    isConnected: boolean;
    battery: Battery;
    camera: Camera;
    gps: GPS;
    home: Home;
    orientation: Orientation;
    permission: Permission;
    piloting: Piloting;
    rth: RTH;
}
