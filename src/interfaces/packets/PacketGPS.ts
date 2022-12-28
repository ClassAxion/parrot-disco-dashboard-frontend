export interface PacketGPS {
    isFixed?: boolean;
    satellites?: number;
    location?: {
        lat: number;
        lon: number;
    };
}
