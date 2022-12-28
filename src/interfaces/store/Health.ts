export interface Health {
    magnetoCalibrationRequired: boolean;
    pitotCalibrationRequired: boolean;
    imuState: boolean;
    barometerState: boolean;
    ultrasonicState: boolean;
    gpsState: boolean;
    magnetometerState: boolean;
    verticalCameraState: boolean;
    motorState: boolean;
    flightPlanAvailability: boolean;
}
