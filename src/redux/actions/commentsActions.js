export const getCommentsAction = (data) => {
    // console.log("DATA COMMENTS DARI COMPONENT UI", data)
    return {
        type: "GET_COMMENTS",
        payload: data
    }
}