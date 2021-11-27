import {SearchRoomState} from "../types/reduxState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: SearchRoomState = {
    location: "",
    latitude: 0,
    longitude: 0,
    checkInDate: null,
    checkOutDate: null,
    adultCount: 1,
    childrenCount: 0,
    infantsCount: 0
}

const searchRoom = createSlice({
    name: "searchRoom",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
            return state;
        },
        setStartDate: (state, action: PayloadAction<string | null>) => {
            state.checkInDate = action.payload;
            return state;
        },
        setEndDate: (state, action: PayloadAction<string | null>) => {
            state.checkOutDate = action.payload;
            return state;
        },
        setAdultCount: (state, action: PayloadAction<number>) => {
            state.adultCount = action.payload;
            return state;
        },
        setChildrenCount: (state, action: PayloadAction<number>) => {
            state.childrenCount = action.payload;
            return state;
        },
        setInfantsCount: (state, action: PayloadAction<number>) => {
            state.infantsCount = action.payload;
            return state;
        },
        setLatitude: (state, action: PayloadAction<number>) => {
            state.latitude = action.payload;
            return state;
        },
        setLongitude: (state, action: PayloadAction<number>) => {
            state.longitude = action.payload;
            return state;
        },
    },
});

export const searchRoomActions = { ...searchRoom.actions };

export default searchRoom;