import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../helper";
import AddPostComponent from "../Components/AddPost/AddPost";
import { Form, FormGroup, Label, Input, InputGroup, InputGroupText, Button, Col, Toast, ToastHeader, ToastBody } from "reactstrap";

const UploadPostPage = (props) => {

    const dispatch = useDispatch();

    const { username, posts } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            posts: state.postsReducer.posts
        }
    })

    console.log("isi state di uploadPost page", username, posts)

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