export interface Geofence {
    maxAltitude?: {
        current: number;
        min: number;
        max: number;
    };
    minAltitude?: {
        current: number;
        min: number;
        max: number;
    };
    maxDistance?: {
        current: number;
        min: number;
        max: number;
    };
    circlingAltitude?: {
        current: number;
        min: number;
        max: number;
    };
    isEnabled: boolean;
}
