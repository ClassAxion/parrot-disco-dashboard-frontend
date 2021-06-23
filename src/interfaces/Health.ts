export interface Health {
    isGoodToTakeOff: boolean;
    magnetoCalibrationRequired: boolean;
    imuState: boolean;
    barometerState: boolean;
    ultrasoundState: boolean;
    gpsState: boolean;
    magnetometerState: boolean;
    verticalCameraState: boolean;
    motorState: boolean;
}
