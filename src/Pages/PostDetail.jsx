import React, { useState, useEffect } from "react";
import '../index.scss';
import './_PostDetail.scss';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { ReactComponent as CopyIcon } from '../Assets/IconRef/copylink.svg';
import { ReactComponent as FavIcon } from '../Assets/IconRef/love-letter.svg';
import { ReactComponent as ShareIcon } from '../Assets/IconRef/share.svg';
import { ReactComponent as ThreeDotsIcon } from '../Assets/IconRef/more-with-three-dots-button.svg';
import { ReactComponent as WaIcon } from '../Assets/IconRef/icons8-whatsapp.svg';
import { ReactComponent as TwitterIcon } from '../Assets/IconRef/icons8-twitter.svg';
import { ReactComponent as FbIcon } from '../Assets/IconRef/icons8-facebook.svg';
import CardsForComments from "../Components/CardsForComments/CardsForComments";
import Axios from 'axios';
import { API_URL } from "../helper";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, Toast, ToastBody } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from "../redux/actions/postsActions";
import { updateLikesAction } from "../redux/actions/usersActions";
import { getCommentsAction } from "../redux/actions/commentsActions";
import { toast } from "react-toastify";

const PostDetailPage = (props) => {

    const { state, search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [detail, setDetail] = useState({});
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

    const [openShare, setOpenShare] = useState(false);

    const { userid, username, status, likes, posts, comments, commentsFiltered } = useSelector((state) => {
        return {
            userid: state.usersReducer.id,
            username: state.usersReducer.username,
            status: state.usersReducer.status,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts,
            comments: state.commentsReducer.comments,
            commentsFiltered: state.commentsReducer.comments.filter(val => val.postId == props.query)
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
        Axios.get(`${API_URL}/comments/get`)
            .then((res) => {
                dispatch(getCommentsAction(res.data))
            }).catch((err) => {
                console.log(err)
            })
    }

    const getCommentsForThisPost = async () => {
        const res = await Axios.get(`${API_URL}/comments/paginate?postId=${query}&_page=1`);
        // const res = await Axios.get(`${API_URL}/comments?postId=${query}&_sort=commentDate&_order=desc&_page=1&_limit=5`);
        //pas konek express API _limit, _sort dan _order dah ga dibutuhin krn fixed sql query harus sort dan order nya begitu ❗❗❗

        const data = res.data;
        // const data = await res.json();
        setCommentsArr(data);

        // if (commentsFiltered.length === 0 || commentsFiltered.length < 5) {
        //     setHasMore(false);
        // }
        if (data.length === 0 || data.length < 5) {
            setHasMore(false);
        }

        setPageNumber(2)
    }

    const fetchComments = async () => {
        const res = await Axios.get(`${API_URL}/comments/paginate?postId=${query}&_page=${pageNumber}`);
        // const res = await Axios.get(`${API_URL}/comments?postId=${query}&_sort=commentDate&_order=desc&_page=${pageNumber}&_limit=5`);
        //pas konek express API _limit, _sort dan _order dah ga dibutuhin krn fixed sql query harus sort dan order nya begitu ❗❗❗

        // const res = await fetch(`${API_URL}/comments?postId=${query}&_sort=commentDate&_order=desc&_page=${pageNumber}&_limit=5`);

        const data = res.data;
        // const data = await res.json();
        return data;
    }

    const fetchData = async () => {
        const commentsFromServer = await fetchComments();

        console.log("isi commentsFromServer", commentsFromServer)
        //console.log commentsFromServer komen kurang dr 5
        //console.log commentsFromServer komen > 5

        setCommentsArr([...commentsArr, ...commentsFromServer]);

        if (commentsFromServer.length === 0 || commentsFromServer.length < 5) {
            setHasMore(false);
            // setPageNumber(2)
        }

        let temp = pageNumber;
        temp++;
        console.log("isi increment temp", temp)
        setPageNumber(temp);
    }

    const getDetail = () => {
        console.log("isi search", search)
        Axios.get(`${API_URL}/posts/detail${search}`)
            .then((response) => {
                console.log("isi detail", response.data);
                console.log("isi detail.media", response.data.media);
                setDetail(response.data);
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

        let token = localStorage.getItem("tokenIdUser");
        if (token) {
            Axios.patch(`${API_URL}/posts/${detail.id}`, {
                caption: inputCaption
                // editedDate: latestDate // pas sambung ke express api bisa diganti penanggalan dari sql query
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                console.log("isi res.data pas klik save", res.data)
                getDetail()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const handleDelete = () => {
        setSelectedEdit(0);
        setOpenDelete(!openDelete);
    }

    const confirmDelete = () => {
        setOpenDelete(!openDelete);

        let token = localStorage.getItem("tokenIdUser");
        Axios.delete(`${API_URL}/posts/${detail.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                getPosts()
            }).catch((err) => {
                console.log(err)
            })
        navigate("/yourposts", { replace: true })
    }

    const handleLike = () => {
        let IdPost = parseInt(search.split("=")[1]);
        let tempLike = [...likes];
        let tempPosts = [...posts];
        let token = localStorage.getItem("tokenIdUser");

        if (!tempLike.includes(IdPost)) {
            tempLike.push(IdPost);
            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);

            console.log("index di post", idxInPost)
            // console.log("NOL di post itu saat ini", tempPosts[idxInPost].numberOfLikes)

            // let tempNoOfLikes = tempPosts[idxInPost].numberOfLikes;
            // tempNoOfLikes++;
            // console.log("number of likes nambah?", tempNoOfLikes)

            //axios patch user likes
            if (token) {
                let formData = new FormData();
                let data = { likes: tempLike };
                console.log("data", data);
                formData.append('data', JSON.stringify(data));
                Axios.patch(`${API_URL}/users/edit`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    dispatch(updateLikesAction(res.data))
                    getPosts()
                    //axios patch posts number of likes
                    // updateNumberofLikes(IdPost, tempNoOfLikes)

                    //set warna fill like iconnya
                    setFavoriteFill("#e13b6e")
                }).catch((err) => {
                    console.log(err)
                });
            }


        } else {

            let idxInLikes = tempLike.indexOf(IdPost);
            tempLike.splice(idxInLikes, 1);
            console.log("tempLike setelah coba unlike", tempLike)

            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);

            // let tempNoOfLikes = tempPosts[idxInPost].numberOfLikes;
            // tempNoOfLikes--;
            // console.log("number of likes berkurang?", tempNoOfLikes)

            //axios patch user likes
            if (token) {
                let formData = new FormData();
                let data = { likes: tempLike };
                console.log("data", data);
                formData.append('data', JSON.stringify(data));
                Axios.patch(`${API_URL}/users/edit`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    dispatch(updateLikesAction(res.data))
                    getPosts()
                    //axios patch posts number of likes
                    // updateNumberofLikes(IdPost, tempNoOfLikes)

                    //set warna fill like iconnya
                    setFavoriteFill("#351c75")
                }).catch((err) => {
                    console.log(err)
                });
            }

        }
    }

    // const updateNumberofLikes = (Id, tempNoOfLikes) => {
    //     Axios.patch(`${API_URL}/posts/${Id}`, {
    //         numberOfLikes: tempNoOfLikes
    //     }).then((res) => {
    //         getPosts()
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    const getPosts = () => {
        Axios.get(`${API_URL}/posts/get`)
            .then((response) => {
                console.log("data posts terambil smua?", response.data)
                dispatch(getPostsAction(response.data))
            }).catch((error) => {
                console.log(error)
            })
    }

    const handlePost = () => {
        // console.log("isi komen2 awal tanpa filter postId", allComments)

        let token = localStorage.getItem("tokenIdUser");
        // if (comments.length > 0) {
        Axios.post(`${API_URL}/comments/add`, {
            postId: parseInt(query),
            // id: comments[comments.length - 1].id + 1,
            // username,//pas konek express bisa dihapus
            // commentDate: latestDate, //pas konek express bisa dihapus
            // editedDate: "", //pas konek express bisa dihapus
            comment: inputComment
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log("isi res.data pas klik handlePost", res.data)
            getAllComments()
            setInputComment("")
            getCommentsForThisPost()
            // if(hasMore){
            //     fetchData()
            // }
        }).catch((err) => {
            console.log(err)
        })

        // } 
        // else {
        //     Axios.post(`${API_URL}/comments`, {
        //         postId: parseInt(query),
        //         id: 0,
        //         username,
        //         commentDate: latestDate,
        //         editedDate: "",
        //         comment: inputComment
        //     }).then((res) => {
        //         // console.log("isi res.data pas klik handlePost", res.data)
        //         getAllComments()
        //         setInputComment("")
        //         getCommentsForThisPost()
        //         // if(hasMore){
        //         //     fetchData()
        //         // }
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`http://localhost:3001/postdetail${search}`);

        setOpenShare(!openShare);
        toast.info("Link copied");
    }

    return (
        <div
            className="row container py-3 mx-auto"
            style={{ minHeight: "100vh" }}
        >
            {
                username
                    ?
                    status === "verified"
                        ?
                        <>
                            <Modal
                                isOpen={openDelete}
                                toggle={() => setOpenDelete(!openDelete)}
                                size="sm"
                                centered
                                className="gen_font_content"
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
                                            color="warning"
                                            outline
                                            size="sm"
                                            className="me-2 gen_btn_warning_secondary"
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            onClick={() => setOpenDelete(!openDelete)}
                                            color="secondary"
                                            outline
                                            size="sm"
                                            className="gen_btn_warning_secondary"
                                        >
                                            No
                                        </Button>
                                    </div>
                                </ModalBody>
                            </Modal>
                            <Modal
                                isOpen={openShare}
                                toggle={() => setOpenShare(!openShare)}
                                // size="sm"
                                style={{ width: "220px" }}
                                centered
                                className="gen_font_content"
                            >
                                <ModalBody
                                    className="share__socials"
                                >
                                    <WhatsappShareButton
                                        url={`http://localhost:3001/postdetail${search}`}
                                    >
                                        <WaIcon
                                            className="share__socials__icons"
                                            onClick={() => setOpenShare(!openShare)}
                                        />
                                    </WhatsappShareButton>
                                    <TwitterShareButton
                                        url={`http://localhost:3001/postdetail${search}`}
                                    >
                                        <TwitterIcon
                                            className="share__socials__icons"
                                            onClick={() => setOpenShare(!openShare)}
                                        />
                                    </TwitterShareButton>
                                    <FacebookShareButton
                                        url={`http://localhost:3001/postdetail${search}`}
                                    >
                                        <FbIcon
                                            className="share__socials__icons"
                                            onClick={() => setOpenShare(!openShare)}
                                        />
                                    </FacebookShareButton>
                                    <CopyIcon
                                        className="share__socials__icons"
                                        style={{ width: "25px", height: "30px" }}
                                        onClick={handleCopyLink}
                                    />
                                </ModalBody>
                            </Modal>
                            
                            <div
                                className="col-12 col-md-7 order-md-1"
                            >
                                <img
                                    src={
                                        detail.media
                                            &&
                                            detail.media.includes("http")
                                            ?
                                            detail.media
                                            :
                                            `${API_URL}${detail.media}`
                                    }
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

                                {/* <hr className="_detail_hr" /> */}

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
                                                    className="col-12 col-md-2 mb-2 me-md-2 gen_btn_warning_secondary"
                                                    size="sm"
                                                    color="warning"
                                                    outline
                                                    onClick={handleSave}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    className="col-12 col-md-2 mb-2 gen_btn_warning_secondary"
                                                    size="sm"
                                                    color="secondary"
                                                    outline
                                                    onClick={() => setSelectedEdit(0)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </>
                                }

                                {/* <hr className="_detail_hr" /> */}

                                <div
                                    className="_detail_font_content d-flex align-items-center mt-2 mb-4"
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
                                        onClick={() => setOpenShare(!openShare)}
                                    />

                                    {
                                        detail.username == username &&
                                        <Dropdown
                                            isOpen={dropOpen}
                                            toggle={() => setDropOpen(!dropOpen)}
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

                                {/* <hr className="_detail_hr" /> */}

                                {
                                    detail.id &&
                                    <CardsForComments
                                        // detail={detail}
                                        loginUsername={username}

                                        commentsArr={commentsArr}
                                        query={query}
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
                                        className="text-start mt-0 mb-1 mb-md-0 order-md-3 gen_font_content"
                                        style={{ fontSize: "11px" }}
                                    >
                                        Limited to 300 characters
                                    </span>
                                    <Button
                                        className="col-12 col-md-2 text-center _detail_button_post order-md-2"
                                        onClick={handlePost}
                                    >
                                        Post
                                    </Button>

                                </div>

                            </div>
                        </>
                        :
                        <>
                            <div className="col-12">
                                <span className="material-icons d-flex justify-content-center"
                                    style={{ color: "#351c75", fontSize: "150px" }}>
                                    <span className="material-symbols-outlined">
                                        gpp_maybe
                                    </span>
                                </span>
                                <h5>401 - Please verify your email first to access this page</h5>
                                <h5>To resend the verification link, please go to <i>Your Profile</i> page</h5>
                            </div>
                        </>
                    :
                    <>
                        <div className="col-12">
                            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                                <span className="material-symbols-outlined">
                                    login
                                </span>
                            </span>
                            <h5>401 - Please sign in first to access this page</h5>
                        </div>
                    </>
            }

        </div>
    )

}

export default PostDetailPage;