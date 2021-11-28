import {UserType} from "./user";
import {RoomType} from "./room";


export type SearchRoomState = {
    location: string;
    latitude: number;
    longitude: number;
    checkInDate: string | null;
    checkOutDate: string | null;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
}

export type UserState = UserType & {
    isLogged: boolean;
}

export type CommonState = {
    validateMode: boolean;
}

export type RoomState = {
    rooms: RoomType[];
    detail: RoomType | null;
}