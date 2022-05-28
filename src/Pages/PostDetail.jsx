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
import { updateLikesAction } from "../redux/actions/usersActions";
import { getCommentsAction } from "../redux/actions/commentsActions";

const PostDetailPage = (props) => {

    const { state, search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [detail, setDetail] = useState({});
    const [allComments, setAllComments] = useState([]);
    const [favoriteFill, setFavoriteFill] = useState("#e13b6e");
    const [dropOpen, setDropOpen] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(0);
    const [inputCaption, setInputCaption] = useState(detail.caption);
    const [inputComment, setInputComment] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [query, setQuery] = useState(search.split("=")[1]);
    const [commentsArr, setCommentsArr] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);

    const { userid, username, likes, posts, comments } = useSelector((state) => {
        return {
            userid: state.usersReducer.id,
            username: state.usersReducer.username,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts,
        }
    })

    const currentDate = new Date();
    const latestDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1) < 10 ? `0${(currentDate.getMonth() + 1)}` : `${(currentDate.getMonth() + 1)}`}/${currentDate.getDate()}`

    useEffect(() => {
        getDetail()
        favoriteFillTrigger()
        getCommentsForThisPost()
        getAllComments()
    }, []);

    const getAllComments = () => {
        Axios.get(`${API_URL}/comments`)
            .then((res) => {
                setAllComments(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const getCommentsForThisPost = async () => {
        const res = await fetch(`${API_URL}/comments?postId=${query}&_page=1&_limit=3`);

        const data = await res.json();
        setCommentsArr(data);
    }

    // console.log("isi commentsArr", commentsArr)

    const fetchComments = async () => {
        const res = await fetch(`${API_URL}/comments?postId=${query}&_page=${pageNumber}&_limit=3`);

        const data = await res.json();
        return data;
    }

    const fetchData = async () => {
        const commentsFromServer = await fetchComments();

        setCommentsArr([...commentsArr, ...commentsFromServer]);

        if (commentsFromServer.length === 0 || commentsFromServer.length < 3) {
            setHasMore(false);
        }

        let temp = pageNumber;
        temp++;
        setPageNumber(temp);
    }

    const getDetail = () => {
        console.log("isi search", search)
        Axios.get(`${API_URL}/posts${search}`)
            .then((response) => {
                console.log("isi detail", response.data[0]);
                setDetail(response.data[0]);
            })
            .catch((error) => { console.log(error) })
    };

    const favoriteFillTrigger = () => {
        let tempLike = [...likes];
        let IdPost = parseInt(search.split("=")[1]);
        if (!tempLike.includes(IdPost)) {
            console.log("isi likes, isi search stlh split", tempLike, IdPost)
            setFavoriteFill("#351c75")
        }
    }

    const handleSave = () => {
        setSelectedEdit(0);
        console.log("yang ingin disave", inputCaption)

        Axios.patch(`${API_URL}/posts/${detail.id}`, {
            caption: inputCaption,
            editedDate: latestDate
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

    const handleLike = () => {
        let IdPost = parseInt(search.split("=")[1]);
        let tempLike = [...likes];
        let tempPosts = [...posts];
        if (!tempLike.includes(IdPost)) {
            tempLike.push(IdPost);
            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);
            console.log("index di post", idxInPost)
            console.log("NOL di post itu saat ini", tempPosts[idxInPost].numberOfLikes)
            let tempNoOfLikes = tempPosts[idxInPost].numberOfLikes;
            tempNoOfLikes++;
            console.log("number of likes nambah?", tempNoOfLikes)

            //axios patch user likes
            Axios.patch(`${API_URL}/users/${userid}`, {
                likes: tempLike
            }).then((res) => {
                dispatch(updateLikesAction(res.data.likes))

                //axios patch posts number of likes
                updateNumberofLikes(IdPost, tempNoOfLikes)

                //set warna fill like iconnya
                setFavoriteFill("#e13b6e")
            }).catch((err) => {
                console.log(err)
            });

        } else {
            let idxInLikes = tempLike.indexOf(IdPost);
            tempLike.splice(idxInLikes, 1);
            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);
            let tempNoOfLikes = tempPosts[idxInPost].numberOfLikes;
            tempNoOfLikes--;
            console.log("number of likes berkurang?", tempNoOfLikes)

            //axios patch user likes
            Axios.patch(`${API_URL}/users/${userid}`, {
                likes: tempLike
            }).then((res) => {
                dispatch(updateLikesAction(res.data.likes))

                //axios patch posts number of likes
                updateNumberofLikes(IdPost, tempNoOfLikes)

                //set warna fill like iconnya
                setFavoriteFill("#351c75")
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    const updateNumberofLikes = (Id, tempNoOfLikes) => {
        Axios.patch(`${API_URL}/posts/${Id}`, {
            numberOfLikes: tempNoOfLikes
        }).then((res) => {
            getPosts()
        }).catch((err) => {
            console.log(err)
        })
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

    const handlePost = () => {
        // console.log("isi komen2 awal tanpa filter postId", allComments)

        if (allComments.length > 0) {
            Axios.post(`${API_URL}/comments`, {
                postId: query,
                id: allComments[allComments.length - 1].id + 1,
                username,
                commentDate: latestDate,
                editedDate: "",
                comment: inputComment
            }).then((res) => {
                console.log("isi res.data pas klik handlePost", res.data)
                getCommentsForThisPost()
                getAllComments()
                setInputComment("")
            }).catch((err) => {
                console.log(err)
            })

        } else {
            Axios.post(`${API_URL}/comments`, {
                postId: query,
                id: 0,
                username,
                commentDate: latestDate,
                editedDate: "",
                comment: inputComment
            }).then((res) => {
                // console.log("isi res.data pas klik handlePost", res.data)
                getCommentsForThisPost()
                getAllComments()
                setInputComment("")
            }).catch((err) => {
                console.log(err)
            })
        }
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
                                onChange={(e) => setInputCaption(e.target.value)}
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
                        fill={favoriteFill}
                        width="22px"
                        height="22px"
                        className="me-3"
                        style={{ cursor: "pointer" }}
                        onClick={handleLike}
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
                        loginUsername={username}

                        commentsArr={commentsArr}
                        fetchData={fetchData}
                        hasMore={hasMore}
                    />
                }

                <hr className="_detail_hr" />

                <div
                    className="row mx-auto"
                >
                    <Input
                        className="col-12 col-md-10 mb-0 order-md-1 _comment"
                        type="text"
                        placeholder="Share your thought..."
                        bsSize="md"
                        style={{ height: "2.5rem" }}
                        maxLength={300}
                        value={inputComment}
                        onChange={(e) => setInputComment(e.target.value)}
                    />
                    <span
                        className="text-start mt-0 mb-1 mb-md-0 order-md-3"
                        style={{ fontWeight: "normal", fontSize: "9px" }}
                    >
                        Limited to 300 characters
                    </span>
                    <Button
                        className="col-12 col-md-2 text-center _detail_button order-md-2"
                        onClick={handlePost}
                    >
                        Post
                    </Button>

                </div>

            </div>

        </div>
    )

}

export default PostDetailPage;