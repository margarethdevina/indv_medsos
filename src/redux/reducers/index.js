import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";

export const globalStore = combineReducers({
    usersReducer
})