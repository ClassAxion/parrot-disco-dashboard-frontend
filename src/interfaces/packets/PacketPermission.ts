export interface PacketPermission {
    isSuperUser: boolean;
    canPilotingPitch: boolean;
    canPilotingRoll: boolean;
    canPilotingThrottle: boolean;
    canMoveCamera: boolean;
    canUseAutonomy: boolean;
}
