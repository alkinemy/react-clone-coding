import {RegisterRoomState} from "../../types/room";
import axios from "./index";


export const registerRoomAPI = (body: RegisterRoomState & { hostId: number}) => axios.post("/api/rooms", body);