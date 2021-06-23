export interface Health {
    magnetoCalibrationRequired: boolean;
    imuState: boolean;
    barometerState: boolean;
    ultrasoundState: boolean;
    gpsState: boolean;
    magnetometerState: boolean;
    verticalCameraState: boolean;
    motorState: boolean;
}
