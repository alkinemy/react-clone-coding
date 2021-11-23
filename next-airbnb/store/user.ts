import { UserState } from "../types/reduxState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user";

const initialState: UserState = {
    id: 0,
    email: "",
    lastName: "",
    firstName: "",
    birthday: "",
    isLogged: false,
    profileImage: "",
}

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<UserType>) => {
            state = {...action.payload, isLogged: true};
            return state;
        },
        initUser: (state) => {
            state = initialState;
            return state;
        }
    },
});

export const userActions = { ...user.actions }

export default user;