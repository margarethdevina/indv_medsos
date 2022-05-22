
export const getPostsAction = (data) => {
    console.log("DATA POSTS DARI COMPONENT UI", data)
    return {
        type: "GET_POSTS",
        payload: data
    }
}

// export const updateCaptionAction = (data) => {
//     return {
//         type: "UPDATE_CAPTION",
//         payload: data
//     }
// }