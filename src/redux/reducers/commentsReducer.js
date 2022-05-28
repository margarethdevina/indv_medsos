const INITIAL_STATE = {
    comments: []
}

export const commentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_COMMENTS":
            console.log("DAPAT DATA COMMENTS DARI ACTION", action.payload)
            return { ...state, comments: action.payload }
        default:
            return state;
    }
}