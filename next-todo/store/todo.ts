import { TodoType } from "../types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoReduxState {
    todos: TodoType[];
}

const initialState: TodoReduxState = {
    todos: [],
}

const todo = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodo: (state, action: PayloadAction<TodoType[]>) => {
            state.todos = action.payload;
        }
    }
});

export const todoActions = {...todo.actions};

export default todo;