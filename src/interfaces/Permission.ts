export interface Permission {
    isSuperUser: boolean;
    canPilotingPitch: boolean;
    canPilotingRoll: boolean;
    canPilotingThrottle: boolean;
    canMoveCamera: boolean;
    canUseAutonomy: boolean;
}
