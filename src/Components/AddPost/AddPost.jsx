import React, { useState, useEffect } from "react";
import '../../index.scss';
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../helper";
import { getPostsAction } from "../../redux/actions/postsActions";
import { Form, FormGroup, Label, Input, InputGroup, InputGroupText, Button, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddPostComponent = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentDate = new Date();
    const uploadDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1) < 10 ? `0${(currentDate.getMonth() + 1)}` : `${(currentDate.getMonth() + 1)}`}/${currentDate.getDate()}`

    const getPosts = () => {
        Axios.get(`${API_URL}/posts/get`)
            .then((response) => {
                // console.log("isi dbPosts", response.data)
                dispatch(getPostsAction(response.data))
            }).catch((error) => { console.log(error) })
    };

    let { userId, username, posts } = props;

    const [newPost, setNewPost] = useState({
        media: "",
        caption: "",
    })

    const handleImage = (value) => {
        // console.log("value handleImage", value)
        setNewPost({ ...newPost, media: value });
    }

    const handleCaption = (value) => {
        setNewPost({ ...newPost, caption: value });
    }

    const handleUpload = async () => {
        // console.log("cek image yg masuk ke newPost", newPost.media)
        // console.log("cek caption yg masuk", newPost.caption)
        // console.log("cek uploadDate yg masuk", newPost.uploadDate)

        let { userId, username, media, caption, uploadDate, editedDate, numberOfLikes } = newPost;

        let token = localStorage.getItem("tokenIdUser");

        try {
            if (media == "" || caption == "") {
                toast.warn("Fill in all form");
            } else {
                if (token) {
                    let formData = new FormData();
                    let data = { caption };
                    // console.log("data", data);
                    formData.append('data', JSON.stringify(data));
                    formData.append('media', media);
                    // console.log("formData",formData)

                    let res = await Axios.post(`${API_URL}/posts/add`, formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    // console.log("post yg terupload", res.data);
                    // yg direturn jadi res.data si id:idPost, username, media, caption, uploadDate, editedDate, numberOfLikes
                    dispatch(getPostsAction(res.data));
                    getPosts();
                    setNewPost({ ...newPost, media: "", caption: "" });
                    navigate("/yourposts");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            className="container mx-auto col-10 col-md-6 py-3 pb-md-5"
        >

            <fieldset
                className="border border-0 shadow-sm bg-white rounded py-3 row"
            >
                <p
                    className="gen_font_title"
                >
                    Add a New Post
                </p>
                <hr />
                <Form
                    className="text-start gen_font_content"
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
                                type="file"
                                onChange={(e) => handleImage(e.target.files[0])}
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
                        className="col-12 mb-2 gen_btn_success"
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