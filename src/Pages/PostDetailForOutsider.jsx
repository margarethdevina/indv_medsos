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

const PostDetailPublicPage = (props) => {

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

    const { userid, status, likes, posts, comments, commentsFiltered } = useSelector((state) => {
        return {
            userid: state.usersReducer.id,
            // username: state.usersReducer.username,
            status: state.usersReducer.status,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts,
            comments: state.commentsReducer.comments,
            commentsFiltered: state.commentsReducer.comments.filter(val => val.postId == query)
        }
    })
    // const { userid, username, status, likes, posts, comments, commentsFiltered } = useSelector((state) => {
    //     return {
    //         userid: state.usersReducer.id,
    //         username: state.usersReducer.username,
    //         status: state.usersReducer.status,
    //         likes: state.usersReducer.likes,
    //         posts: state.postsReducer.posts,
    //         comments: state.commentsReducer.comments,
    //         commentsFiltered: state.commentsReducer.comments.filter(val => val.postId == query)
    //     }
    // })

    useEffect(() => {
        getDetail()
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

        console.log("isi commentsFromServer", commentsFromServer)
        //console.log commentsFromServer komen kurang dr 5
        //console.log commentsFromServer komen > 5

        setCommentsArr([...commentsArr, ...commentsFromServer]);

        if (commentsFromServer.length === 0 || commentsFromServer.length < 5) {
            setHasMore(false);

        }

        let temp = pageNumber;
        temp++;
        console.log("isi increment temp", temp)
        setPageNumber(temp);
    }

    const handleSeeMore = () => {
        fetchData()
        setHasMore(true)
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

    const getPosts = () => {
        Axios.get(`${API_URL}/posts/get`)
            .then((response) => {
                console.log("data posts terambil smua?", response.data)
                dispatch(getPostsAction(response.data))
            }).catch((error) => {
                console.log(error)
            })
    }

    const printDate = () => {

        let endDate = DateTime.now();
        console.log("endDate", endDate)

        let startDate = DateTime.fromISO(detail.uploadDate);
        console.log("startDate", startDate)

        let diffInterval = endDate.diff(startDate, ['weeks', 'days', 'hours', 'minutes', 'seconds']).toObject();

        let { weeks, days, hours, minutes, seconds } = diffInterval;

        console.log("diffInterval di postnya", diffInterval);
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
        console.log("intervalShown di postnya", intervalShown);

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
                // description={`${detail.caption}`}
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

            <>
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

                    {/* <hr className="_detail_hr" /> */}

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

                    <div
                        className="_detail_font_content d-flex align-items-center mt-2 mb-4"
                    >
                        <ShareIcon
                            fill="#351c75"
                            width="22px"
                            height="22px"
                            className="me-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenShare(!openShare)}
                        />

                    </div>

                    {
                        detail.id &&
                        <CardsForComments
                            loginUsername="NONE"

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

                </div>
            </>

        </div>
    )

}

export default PostDetailPublicPage;