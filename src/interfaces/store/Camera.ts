export interface Camera {
    isRecording: boolean;
    canTakePicture: boolean;
    tilt: number;
    pan: number;
    maxTiltSpeed: number;
    maxPanSpeed: number;
    currentTiltPosition: number;
    currentPanPosition: number;
    pictureFormat: string;
    autoWhiteBalance: string;
    exposition: { value: number; min: number; max: number };
    saturation: { value: number; min: number; max: number };
    timelapse?: {
        isEnabled: boolean;
        interval: number;
        minInterval: number;
        maxInterval: number;
    };
    videoStabilization: string;
    videoRecordingMode: string;
    videoFramerate: string;
    videoResolutions: string;
    streamMode: string;
}
