import React from "react";
import { useSelector } from "react-redux";
import AddPostComponent from "../Components/AddPost/AddPost";

const UploadPostPage = (props) => {

    const { username, posts } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            posts: state.postsReducer.posts
        }
    })

    // console.log("isi state di uploadPost page", username, posts)

    return (
        <div>

            <AddPostComponent
                username={username}
                posts={posts}
            />

        </div>
    )

}

export default UploadPostPage;