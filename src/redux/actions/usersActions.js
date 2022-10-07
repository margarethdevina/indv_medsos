
export const loginAction = (data) => {
    // console.log("DATA USERS DARI COMP UI", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const updateLikesAction = (data) => {
    // console.log("DATA USERS DARI COMP UI respon dari klik like",data)
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