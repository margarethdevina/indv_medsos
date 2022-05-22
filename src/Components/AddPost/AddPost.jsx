import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../helper";
import { getPostsAction } from "../../redux/actions/postsActions";
import { Form, FormGroup, Label, Input, InputGroup, InputGroupText, Button, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

const AddPostComponent = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentDate = new Date();
    const uploadDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1) < 10 ? `0${(currentDate.getMonth() + 1)}` : `${(currentDate.getMonth() + 1)}`}/${currentDate.getDate()}`

    const getPosts = () => {
        Axios.get(`${API_URL}/posts`)
            .then((response) => {
                console.log("isi dbPosts", response.data)
                dispatch(getPostsAction(response.data))
            }).catch((error) => { console.log(error) })
    };

    let { username, posts } = props;

    const [newPost, setNewPost] = useState({
        username,
        media: "",
        caption: "",
        uploadDate,
        editedDate: "",
        numberOfLikes: 0,
        comments: []
    })

    const handleImage = (value) => {
        setNewPost({ ...newPost, media: value });
    }

    const handleCaption = (value) => {
        setNewPost({ ...newPost, caption: value });
    }

    const handleUpload = async () => {
        console.log("cek image yg masuk ke newPost", newPost.media)
        console.log("cek caption yg masuk", newPost.caption)
        console.log("cek uploadDate yg masuk", newPost.uploadDate)

        let { username, media, caption, uploadDate, editedDate, numberOfLikes, comments } = newPost
        try {
            if (media == "" || caption == "") {
                alert("Fill in all form")
            } else {
                let res = await Axios.post(`${API_URL}/posts`, {
                    username,
                    media,
                    caption,
                    uploadDate,
                    editedDate,
                    numberOfLikes,
                    comments
                })
                console.log("post yg terupload", res.data);
                dispatch(getPostsAction(res.data));
                getPosts();
                setNewPost({ ...newPost, media: "" })
                setNewPost({ ...newPost, caption: "" })
                // navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className="container mx-auto col-10 col-md-6 py-3"
        >
            <fieldset
                className="border border-2 shadow-lg bg-white rounded py-3 row"
            >
                <h1>
                    Add a New Post
                </h1>
                <hr />
                <Form
                    className="text-start"
                >
                    <FormGroup row>
                        <Label
                            sm={4}
                            for="inputImage"
                        >
                            Media / image
                        </Label>
                        <Col sm={8}>
                            <Input
                                id="inputImage"
                                defaultValue={newPost.media}
                                placeholder="Insert a media / image"
                                type="text"
                                onChange={(e) => handleImage(e.target.value)}
                            // type="file"
                            // onChange={(e) => handleImage(e.target.files[0])}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            sm={4}
                            for="inputCaption"
                        >
                            Caption
                        </Label>
                        <Col sm={8}>
                            <Input
                                id="inputCaption"
                                value={newPost.caption}
                                placeholder="Insert your caption"
                                type="textarea"
                                onChange={(e) => handleCaption(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <Button
                        className="col-12 mb-2"
                        color="success"
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </Form>

            </fieldset>


        </div>
    )
}

export default AddPostComponent;