import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { postsReducer } from "./postsReducer";
import { commentsReducer } from "./commentsReducer";


export const globalStore = combineReducers({
    usersReducer,
    postsReducer,
    commentsReducer
})