const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    email: "",
    status: "",
    role: "",
    fullname: "",
    bio: "",
    profilePicture: "",
    likes: []
}

export const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            // console.log("DPT DATA USERS DR ACTION", action.payload)
            return {
                ...state, ...action.payload
            }
        case "UPDATE_LIKES":
            // console.log("DPT DATA USERS DR ACTION respon dari klik like",action.payload)
            return {
                ...state, likes: action.payload
            }
        case "LOGOUT":
            // console.log("initial state",INITIAL_STATE)
            return INITIAL_STATE
        default:
            return state;
    }
}