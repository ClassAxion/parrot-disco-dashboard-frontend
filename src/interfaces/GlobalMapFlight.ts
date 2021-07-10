export interface GlobalMapFlight {
    id: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    speed?: number;
    altitude?: number;
    angle?: number;
    updatedAt: number;
}
