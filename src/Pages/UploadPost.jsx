import React from "react";
import { useSelector } from "react-redux";
import AddPostComponent from "../Components/AddPost/AddPost";

const UploadPostPage = (props) => {

    const { userId, username, posts } = useSelector((state) => {
        return {
            userId: state.usersReducer.id,
            username: state.usersReducer.username,
            posts: state.postsReducer.posts
        }
    })

    // console.log("isi state di uploadPost page", username, posts)

    return (
        <div
        className="pb-md-5 mb-md-5"
        >

            <AddPostComponent
                userId = {userId}
                username={username}
                posts={posts}
            />

        </div>
    )

}

export default UploadPostPage;