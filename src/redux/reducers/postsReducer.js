const INITIAL_STATE = {
    posts: []
}

export const postsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_POSTS":
            console.log("DAPAT DATA POSTS DARI ACTION", action.payload)
            return {
                ...state, posts: action.payload
            }
        default:
            return state;
    }
}

