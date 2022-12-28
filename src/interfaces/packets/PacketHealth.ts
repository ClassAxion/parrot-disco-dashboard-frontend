export interface PacketHealth {
    magnetoCalibrationRequired?: boolean;
    pitotCalibrationRequired?: boolean;
    imuState?: boolean;
    barometerState?: boolean;
    ultrasonicState?: boolean;
    gpsState?: boolean;
    magnetometerState?: boolean;
    verticalCameraState?: boolean;
    flightPlanAvailability?: boolean;
}
