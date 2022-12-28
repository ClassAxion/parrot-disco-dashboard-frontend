export enum FlyingState {
    LANDED = 0,
    TAKING_OFF = 1,
    HOVERING = 2,
    FLYING = 3,
    LANDING = 4,
    EMERGENCY = 5,
}

export interface PacketState {
    flyingTime?: number;
    flyingState?: FlyingState;
    isDiscoConnected?: boolean;
}
