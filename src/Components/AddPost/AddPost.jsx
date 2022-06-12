import React, { useState, useEffect } from "react";
import '../../index.scss';
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../helper";
import { getPostsAction } from "../../redux/actions/postsActions";
import { Form, FormGroup, Label, Input, InputGroup, InputGroupText, Button, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

const AddPostComponent = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openToast, setOpenToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");

    const currentDate = new Date();
    const uploadDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1) < 10 ? `0${(currentDate.getMonth() + 1)}` : `${(currentDate.getMonth() + 1)}`}/${currentDate.getDate()}`

    const getPosts = () => {
        Axios.get(`${API_URL}/posts`)
            .then((response) => {
                console.log("isi dbPosts", response.data)
                dispatch(getPostsAction(response.data))
            }).catch((error) => { console.log(error) })
    };

    let { userId, username, posts } = props;

    const [newPost, setNewPost] = useState({
        userId, //diganti jadi userid krn express api akan return si usernamenya
        media: "",
        caption: "",
        uploadDate, //pas sambung ke express api, ini bisa dihapus
        editedDate: "", //pas sambung ke express api, ini bisa dihapus
        numberOfLikes: 0 //pas sambung ke express api, ini bisa dihapus
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

        let { userId, username, media, caption, uploadDate, editedDate, numberOfLikes } = newPost
        try {
            if (media == "" || caption == "") {
                console.log("Fill in all form")
                setOpenToast(!openToast)
                setToastMsg("Fill in all form")
            } else {
                let res = await Axios.post(`${API_URL}/posts`, {
                    userId, // pas sambung ke express api, ini bisa dihapus karena userId diambil dari readToken
                    media,
                    caption,
                    uploadDate, //pas sambung ke express api, ini bisa dihapus
                    editedDate, //pas sambung ke express api, ini bisa dihapus
                    numberOfLikes //pas sambung ke express api, ini bisa dihapus
                })
                console.log("post yg terupload", res.data); // yg direturn jadi res.data si id:idPost, username, media, caption, uploadDate, editedDate, numberOfLikes
                dispatch(getPostsAction(res.data));
                getPosts();
                setNewPost({ ...newPost, media: "", caption: "" })
                navigate("/yourposts")
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (openToast) {
        setTimeout(() => setOpenToast(!openToast), 3500)
    }

    return (
        <div
            className="container mx-auto col-10 col-md-6 py-3"
        >

            <Toast
                isOpen={openToast}
                className="gen_font_content"
                style={{ position: "fixed", right: "10px", backgroundColor: "#f3f6f4", zIndex: "999"}}
            >
                <ToastHeader
                    icon="warning"
                    toggle={() => setOpenToast(!openToast)}
                    style={{ backgroundColor: "#f3f6f4" }}
                >
                    Add a new post warning
                </ToastHeader>
                <ToastBody>
                    <span>{toastMsg}</span>
                </ToastBody>
            </Toast>

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
                                value={newPost.media}
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
                        className="col-12 mb-2 gen_btn_success"
                        // color="success"
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