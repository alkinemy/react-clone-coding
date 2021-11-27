import { combineReducers, Store } from "redux";
import user from "./user";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import common from "./common";
import auth from "./auth";
import registerRoom from "./registerRoom";
import searchRoom from "./searchRoom";


const rootReducer = combineReducers({
    common: common.reducer,
    user: user.reducer,
    auth: auth.reducer,
    registerRoom: registerRoom.reducer,
    searchRoom: searchRoom.reducer,
});

export type RootState = ReturnType<typeof rootReducer>

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        if (state === initialRootState) {
            return {
                ...state,
                ...action.payload,
            };
        }
        return state;
    }
    return rootReducer(state, action);
};

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<Store> = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);