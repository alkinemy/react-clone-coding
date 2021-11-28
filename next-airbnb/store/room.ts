import {RoomState} from "../types/reduxState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RoomType} from "../types/room";


const initialState: RoomState = {
    rooms: [],
    detail: null,
}

const room = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<RoomType[]>) => {
            state.rooms = action.payload;
            return state;
        },
        setDetailRoom: (state, action: PayloadAction<RoomType>) => {
            state.detail = action.payload;
            return state;
        },
    },
});

export const roomActions = {...room.actions};

export default room;