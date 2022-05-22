import React, { useState, useEffect } from "react";
import './_PostDetail.scss';
import { ReactComponent as FavIcon } from '../Assets/IconRef/love-letter.svg';
import { ReactComponent as ShareIcon } from '../Assets/IconRef/share.svg';
import { ReactComponent as ThreeDotsIcon } from '../Assets/IconRef/more-with-three-dots-button.svg';
import CardsForComments from "../Components/CardsForComments/CardsForComments";
import Axios from 'axios';
import { API_URL } from "../helper";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from "../redux/actions/postsActions";

const PostDetailPage = (props) => {

    const { state, search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});
    const [favoriteFill, setFavoriteFill] = useState("#351c75");
    const [dropOpen, setDropOpen] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(0);
    const [inputCaption, setInputCaption] = useState(detail.caption);
    const [inputComment, setInputComment] = useState("");
    const [openDelete, setOpenDelete] = useState(false)

    const { userid, username, posts } = useSelector((state) => {
        return {
            userid: state.usersReducer.id,
            username: state.usersReducer.username,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts,
        }
    })

    useEffect(() => {
        getDetail()
    }, []);

    const getDetail = () => {
        Axios.get(`${API_URL}/posts${search}`)
            .then((response) => {
                console.log("isi detail", response.data[0])
                setDetail(response.data[0])
            })
            .catch((error) => { console.log(error) })
    };

    const printComments = () => {
        if (detail.id) {
            let { comments } = detail
            //     let dbComments = detail.comments
            console.log("isi comments", comments)
            return comments.map((value, index) => {
                return (
                    <div
                        className="d-flex"
                        key={value.id}
                    >
                        <div>
                            <span>
                                {value.username}
                            </span>
                            <span>
                                {value.comment}
                            </span>
                        </div>
                        <div>
                            <span
                                className="text-muted"
                            >
                                {value.commentDate}
                            </span>
                        </div>
                    </div >
                )
            })
        }
    }

    const handleCaption = (value) => {
        // console.log("isi handleCaption", value)
        setInputCaption(value)
    }

    const handleSave = () => {
        setSelectedEdit(0);
        console.log("yang ingin disave", inputCaption)

        Axios.patch(`${API_URL}/posts/${detail.id}`, {
            caption: inputCaption
        }).then((res) => {
            console.log("isi res.data pas klik save", res.data)
            getDetail()
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDelete = () => {
        setSelectedEdit(0);
        setOpenDelete(!openDelete);
    }

    const confirmDelete = () => {
        setOpenDelete(!openDelete);

        Axios.delete(`${API_URL}/posts/${detail.id}`)
            .then((res) => {
                getPosts()
            }).catch((err) => {
                console.log(err)
            })
            navigate("/yourposts")
    }

    const getPosts = () => {
        Axios.get(`${API_URL}/posts`)
            .then((response) => {
                console.log("data posts terambil smua?", response.data)
                dispatch(getPostsAction(response.data))
            }).catch((error) => {
                console.log(error)
            })
    }


    return (
        <div
            className="row container py-3 mx-auto"
        >
            <Modal
                isOpen={openDelete}
                toggle={() => setOpenDelete(!openDelete)}
                size="sm"
                centered
            >
                <ModalBody

                >
                    <span
                        className="me-1"
                    >Are you sure you want to delete this post?</span>
                    <i>Deleted post can't be returned.</i>
                    <div
                        className="d-flex justify-content-end align-items-center mt-2"
                    >
                        <Button
                            onClick={confirmDelete}
                            color="danger"
                            size="sm"
                            className="me-2"
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={() => setOpenDelete(!openDelete)}
                            color="secondary"
                            size="sm"
                        >
                            No
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
            <div
                className="col-12 col-md-7 order-md-1"
            >
                <img
                    src={detail.media}
                    alt={`${detail.id}-${detail.uploadDate}-media`}
                    width="100%"
                />
            </div>

            <div
                className="col-12 col-md-5 order-md-2"
            >
                <p
                    className="_detail_font"
                >
                    {detail.username}
                </p>

                <hr className="_detail_hr" />

                {
                    selectedEdit == 0
                        ?
                        <p
                            className="_detail_font_content"
                        >
                            {detail.caption}
                        </p>
                        :
                        <>
                            <Input
                                type="textarea"
                                className="mb-2"
                                placeholder={detail.caption}
                                onChange={(e) => handleCaption(e.target.value)}
                            />
                            <div
                                className="d-md-flex justify-content-end"
                            >
                                <Button
                                    className="col-12 col-md-2 mb-2 me-md-2"
                                    size="sm"
                                    color="success"
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="col-12 col-md-2 mb-2"
                                    size="sm"
                                    onClick={() => setSelectedEdit(0)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                }

                <hr className="_detail_hr" />

                <div
                    className="_detail_font_content d-flex align-items-center"
                >
                    <FavIcon
                        fill="#e13b6e"
                        width="22px"
                        height="22px"
                        className="me-3"
                        style={{ cursor: "pointer" }}
                    />

                    <ShareIcon
                        fill="#351c75"
                        width="22px"
                        height="22px"
                        className="me-3"
                        style={{ cursor: "pointer" }}
                    />

                    {
                        detail.username == username &&
                        <Dropdown
                            isOpen={dropOpen}
                            toggle={() => { setDropOpen(!dropOpen) }}
                            direction="end"
                        >
                            <DropdownToggle
                                onClick={() => setDropOpen(!dropOpen)}
                                style={{ backgroundColor: "transparent" }}
                                className="border border-0 p-0 mb-1"
                            >
                                <ThreeDotsIcon
                                    fill="#351c75"
                                    width="22px"
                                    height="22px"
                                // style={{ cursor: "pointer" }}
                                />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={() => setSelectedEdit(1)}
                                >
                                    Edit
                                </DropdownItem>
                                <DropdownItem
                                    onClick={handleDelete}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    }

                </div>

                <hr className="_detail_hr" />

                {
                    detail.id &&
                    <CardsForComments
                        detail={detail}
                    />
                }

                <hr className="_detail_hr" />

                <div
                    className="row mx-auto"
                >
                    <Input
                        className="col-12 col-md-10 w-75 mb-2"
                        type="text"
                        placeholder="share your thought..."
                        bsSize="md"
                        style={{ height: "2.5rem" }}
                    />

                    <Button
                        className="col-12 col-md-2 text-center _detail_button"
                    >
                        Post
                    </Button>

                </div>

            </div>

        </div>
    )

}

export default PostDetailPage;