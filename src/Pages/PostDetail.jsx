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
import { DateTime } from 'luxon';
import MetaDecorator from "../Components/MetaDecorator";

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
            commentsFiltered: state.commentsReducer.comments.filter(val => val.postId == query)
        }
    })

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

        const data = res.data;

        setCommentsArr(data);

        // if (commentsFiltered.length === 0 || commentsFiltered.length < 5) {
        //     setHasMore(false);
        // }
        if (data.length === 0 || data.length < 5) {
            setHasMore(false);
        }

        setHasMore(false)

        setPageNumber(2)
    }

    const fetchComments = async () => {
        const res = await Axios.get(`${API_URL}/comments/paginate?postId=${query}&_page=${pageNumber}`);

        const data = res.data;

        return data;
    }

    const fetchData = async () => {

        const commentsFromServer = await fetchComments();

        // console.log("isi commentsFromServer", commentsFromServer)
        //console.log commentsFromServer komen kurang dr 5
        //console.log commentsFromServer komen > 5

        setCommentsArr([...commentsArr, ...commentsFromServer]);

        if (commentsFromServer.length === 0 || commentsFromServer.length < 5) {
            setHasMore(false);

        }

        let temp = pageNumber;
        temp++;
        // console.log("isi increment temp", temp)
        setPageNumber(temp);
    }

    const handleSeeMore = () => {

        fetchData()
        setHasMore(true)
    }

    const getDetail = () => {
        // console.log("isi search", search)
        Axios.get(`${API_URL}/posts/detail${search}`)
            .then((response) => {
                // console.log("isi detail", response.data);
                // console.log("isi detail.media", response.data.media);
                setDetail(response.data);
            })
            .catch((error) => { console.log(error) })
    };

    const favoriteFillTrigger = () => {
        let tempLike = [...likes];
        let IdPost = parseInt(search.split("=")[1]);
        if (!tempLike.includes(IdPost)) {
            // console.log("isi likes, isi search stlh split", tempLike, IdPost)
            setFavoriteFill("#351c75")
        }
    }

    const handleSave = () => {
        setSelectedEdit(0);
        // console.log("yang ingin disave", inputCaption)

        let token = localStorage.getItem("tokenIdUser");
        if (token) {
            Axios.patch(`${API_URL}/posts/${detail.id}`, {
                caption: inputCaption
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                // console.log("isi res.data pas klik save", res.data)
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
                navigate("/yourposts", { replace: true })
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleLike = () => {
        let IdPost = parseInt(search.split("=")[1]);
        let tempLike = [...likes];
        let tempPosts = [...posts];
        let token = localStorage.getItem("tokenIdUser");

        if (!tempLike.includes(IdPost)) {
            tempLike.push(IdPost);
            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);

            // console.log("index di post", idxInPost)
            // console.log("NOL di post itu saat ini", 

            //axios patch user likes
            if (token) {
                let formData = new FormData();
                let data = { likes: tempLike };
                // console.log("data", data);
                formData.append('data', JSON.stringify(data));
                Axios.patch(`${API_URL}/users/edit`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    dispatch(updateLikesAction(res.data));
                    getPosts();
                    //axios patch posts number of likes

                    //set warna fill like iconnya
                    setFavoriteFill("#e13b6e");

                    getDetail();
                }).catch((err) => {
                    console.log(err)
                });
            }


        } else {

            let idxInLikes = tempLike.indexOf(IdPost);
            tempLike.splice(idxInLikes, 1);
            // console.log("tempLike setelah coba unlike", tempLike)

            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);

            //axios patch user likes
            if (token) {
                let formData = new FormData();
                let data = { likes: tempLike };
                // console.log("data", data);
                formData.append('data', JSON.stringify(data));
                Axios.patch(`${API_URL}/users/edit`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    dispatch(updateLikesAction(res.data));
                    getPosts();
                    //axios patch posts number of likes

                    //set warna fill like iconnya
                    setFavoriteFill("#351c75");

                    getDetail();
                }).catch((err) => {
                    console.log(err)
                });
            }

        }
    }

    const getPosts = () => {
        Axios.get(`${API_URL}/posts/get`)
            .then((response) => {
                // console.log("data posts terambil smua?", response.data)
                dispatch(getPostsAction(response.data))
            }).catch((error) => {
                console.log(error)
            })
    }

    const handlePost = () => {
        // console.log("isi komen2 awal tanpa filter postId", allComments)

        let token = localStorage.getItem("tokenIdUser");
        Axios.post(`${API_URL}/comments/add`, {
            postId: parseInt(query),
            comment: inputComment
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            // console.log("isi res.data pas klik handlePost", res.data)
            getAllComments()
            setInputComment("")
            getCommentsForThisPost()

        }).catch((err) => {
            console.log(err)
        })

    }

    const printDate = () => {

        let endDate = DateTime.now();
        // console.log("endDate",endDate)
        
        let startDate = DateTime.fromISO(detail.uploadDate);
        // console.log("startDate",startDate)

        let diffInterval = endDate.diff(startDate, ['weeks', 'days', 'hours', 'minutes', 'seconds']).toObject();

        let { weeks, days, hours, minutes, seconds } = diffInterval;

        // console.log("diffInterval di postnya", diffInterval);
        // console.log("diffInterval.weeks", weeks);

        let intervalShown = ""
        if (weeks > 0) {
            if (weeks == 1) {
                intervalShown = `${weeks} week ago`
            } else {
                intervalShown = `${weeks} weeks ago`
            }
        } else if (weeks == 0 && days > 0) {
            if (days == 1) {
                intervalShown = `${days} day ago`
            } else {
                intervalShown = `${days} days ago`
            }
        } else if (weeks == 0 && days == 0 && hours > 0) {
            if (hours == 1) {
                intervalShown = `${hours} hour ago`
            } else {
                intervalShown = `${hours} hours ago`
            }
        } else if (weeks == 0 && days == 0 && hours == 0 && minutes > 0) {
            if (minutes == 1) {
                intervalShown = `${minutes} minute ago`
            } else {
                intervalShown = `${minutes} minutes ago`
            }
        } else if (weeks == 0 && days == 0 && hours == 0 && minutes == 0 && seconds > 0) {
            if (seconds < 2) {
                intervalShown = `${Math.floor(seconds)} second ago`
            } else {
                intervalShown = `${Math.floor(seconds)} seconds ago`
            }
        }
        // console.log("intervalShown di postnya", intervalShown);

        return intervalShown;
    }

    const handleCopyLink = () => {

        //link diganti kalau sudah deploy? ❗❗❗
        navigator.clipboard.writeText(`https://leiden.netlify.app/postdetailpublic${search}`);

        setOpenShare(!openShare);
        toast.info("Link copied");
    }

    // console.log("commentsArr.length", commentsArr.length);
    // console.log("commentsFiltered.length", commentsFiltered.length);

    return (
        <div
            className="row container py-3 mx-auto"
            style={{ minHeight: "100vh" }}
        >

            {/* title username | post caption */}
            <MetaDecorator
                title={`${detail.username} on Leiden: "${detail.caption}"`}
                contentImg={
                    detail.media
                        &&
                        detail.media.includes("http")
                        ?
                        detail.media
                        :
                        `${API_URL}${detail.media}`
                }
                contentWebUrl={`https://leiden.netlify.app/postdetailpublic${search}`}
            />

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
                                    <i className="gen_font_content">Deleted post can't be returned.</i>
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
                                style={{ width: "220px" }}
                                centered
                                className="gen_font_content"
                            >
                                <ModalBody
                                    className="share__socials"
                                >
                                    <WhatsappShareButton
                                        url={`https://leiden.netlify.app/postdetailpublic${search}`}
                                    >
                                        <WaIcon
                                            className="share__socials__icons"
                                            onClick={() => setOpenShare(!openShare)}
                                        />
                                    </WhatsappShareButton>
                                    <TwitterShareButton
                                        url={`https://leiden.netlify.app/postdetailpublic${search}`}
                                    >
                                        <TwitterIcon
                                            className="share__socials__icons"
                                            onClick={() => setOpenShare(!openShare)}
                                        />
                                    </TwitterShareButton>
                                    <FacebookShareButton
                                        url={`https://leiden.netlify.app/postdetailpublic${search}`}
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

                                {
                                    selectedEdit == 0
                                        ?
                                        <>
                                            <p
                                                className="_detail_font_content"
                                            >
                                                {detail.caption}
                                            </p>
                                            <div
                                                className="d-md-flex justify-content-between mt-0"
                                            >
                                                <p
                                                    className="mb-3 _card_detail_date text-muted"
                                                >
                                                    {printDate()}
                                                </p>
                                                <p
                                                    className="mb-3 _card_detail_date text-muted"
                                                >
                                                    Liked by {detail.numberOfLikes} people
                                                </p>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <Input
                                                type="textarea"
                                                className="mb-2"
                                                placeholder={detail.caption}
                                                defaultValue={detail.caption}
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

                                {
                                    detail.id &&
                                    <CardsForComments
                                        loginUsername={username}

                                        handleSeeMore={handleSeeMore}

                                        commentsArr={commentsArr}
                                        firstScroll={getCommentsForThisPost}
                                        query={query}
                                        fetchData={fetchData}
                                        hasMore={hasMore}
                                    />
                                }

                                {
                                    hasMore === false
                                        ?
                                        commentsArr.length != commentsFiltered.length
                                            ?
                                            commentsArr.length <= 5
                                            &&
                                            <Button
                                                className="d-flex justify-content-start border-0"
                                                size="sm"
                                                outline
                                                onClick={handleSeeMore}
                                            >
                                                See more...
                                            </Button>
                                            :
                                            null
                                        :
                                        null
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