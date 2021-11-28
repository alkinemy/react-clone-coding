import {RegisterRoomState, RoomType} from "../../types/room";
import axios from "./index";
import {makeQueryString} from "../utils";

type GetRoomListAPIQueries = {
    location?: string | string[];
    checkInDate?: string | string[];
    checkOutDate?: string | string[];
    adultCount?: string | string[];
    childrenCount?: string | string[];
    infantsCount?: string | string[];
    latitude?: string | string[];
    longitude?: string | string[];
    limit: string | string[];
    page: string | string[];
}


export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) => axios.post("/api/rooms", body);

export const getRoomListAPI = (queries: GetRoomListAPIQueries) => axios.get<RoomType[]>(makeQueryString("/api/rooms", queries))