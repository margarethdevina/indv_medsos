import Axios from "axios";
import { API_URL } from '../../helper';

export const loginAction = (data) => {
    console.log("DATA USERS DARI COMP UI", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const updateLikesAction = (data) => {
    return {
        type: "UPDATE_LIKES",
        payload: data
    }
}

export const logoutAction = () => {
    localStorage.removeItem("tokenIdUser")
    return {
        type: "LOGOUT"
    }
}