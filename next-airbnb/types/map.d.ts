declare module "googlemaps";

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}


export type Coordinates = {
    latitude: number;
    longitude: number;
}