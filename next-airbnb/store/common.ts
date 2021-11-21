import { CommonState } from "../types/reduxState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: CommonState = {
    validateMode: false,
}


const common = createSlice({
    name: "common",
    initialState,
    reducers: {
        setValidateMode: (state, action: PayloadAction<boolean>) => {
            state.validateMode = action.payload;
            return state;
        },
    },
});

export const commonActions = { ...common.actions };

export default common;