export interface Camera {
    tilt: number;
    pan: number;
    maxTiltSpeed: number;
    maxPanSpeed: number;
    currentTiltPosition: number;
    currentPanPosition: number;
}
