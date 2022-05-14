import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { postsReducer } from "./postsReducer";

export const globalStore = combineReducers({
    usersReducer,
    postsReducer

})