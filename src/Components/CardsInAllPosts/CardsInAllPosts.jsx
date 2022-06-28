import React, { useState, useEffect } from "react";
import Axios from "axios";
import './_CardsInAllPosts.scss';
import { ReactComponent as FavIcon } from '../../Assets/IconRef/love-letter.svg';
import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from "../../helper";
import { getPostsAction } from "../../redux/actions/postsActions";
import { loginAction, updateLikesAction } from "../../redux/actions/usersActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { DateTime } from "luxon";

const CardsInAllPosts = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // setdataPagination([])
        getPostForFirstScroll()
    }, []);

    const { userid, likes, posts } = useSelector((state) => {
        return {
            userid: state.usersReducer.id,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts
        }
    })

    console.log("isi posts di reducer", posts);
    console.log("isi likes di reducer", likes);
    const [arrLiked, setArrLiked] = useState(posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1)));
    console.log("arrLiked", arrLiked);
    const [arrUnliked, setArrUnliked] = useState(posts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1)));
    console.log("arrUnliked", arrUnliked);

    const handleLike = (IdPost) => {
        let tempLike = [...likes];
        let tempPosts = [...posts];
        let token = localStorage.getItem("tokenIdUser");

        if (!tempLike.includes(IdPost)) {
            tempLike.push(IdPost);
            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);

            console.log("index di post", idxInPost)
            console.log("NOL di post itu saat ini", tempPosts[idxInPost].numberOfLikes)

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
                    dispatch(updateLikesAction(res.data));
                    getPosts();
                    setHasMore(true);
                    getPostForFirstScroll();
                    // setArrLiked(props.likedData);
                    setArrLiked(posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1)));
                    console.log("arrLiked setelah klik", arrLiked);
                    // setArrUnliked(props.unlikedPosts);
                    setArrUnliked(posts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1)));
                    console.log("arrUnliked setelah klik", arrUnliked);

                    console.log("isi post di reducer stlh klik",posts);
                    console.log("isi postsArr stlh klik",postsArr);

                    printAllPosts();

                }).catch((err) => {
                    console.log(err)
                })
            };

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
                    dispatch(updateLikesAction(res.data));
                    getPosts();
                    setHasMore(true);
                    getPostForFirstScroll();
                    // setArrLiked(props.likedData);
                    setArrLiked(posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1)));
                    console.log("arrLiked setelah klik", arrLiked);
                    // setArrUnliked(props.unlikedPosts);
                    setArrUnliked(posts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1)));
                    console.log("arrUnliked setelah klik", arrUnliked);

                    console.log("isi post di reducer stlh klik",posts);
                    console.log("isi postsArr stlh klik",postsArr);

                    printAllPosts();
                }).catch((err) => {
                    console.log(err)
                })
            };
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
                dispatch(getPostsAction(response.data))
                props.handleCallBack(response.data)
                // getPostForFirstScroll()
                // props.firstScroll()
            }).catch((error) => {
                console.log(error)
            })
    }

    const printLiked = () => {
        // console.log("likes dr reducer", likes)
        let results = posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1));
        // console.log("results", results)
        // console.log("props.likedData",props.likedData)
        return results.map((value, index) => {
            return (
                <CardColumns
                    key={value.id}
                    className="col-12 col-md-6"
                >
                    <Card
                        className="border-0 shadow-sm"
                    >
                        <CardImg
                            onClick={() => navigate(`/postdetail?id=${value.id}`)}
                            src={value.media.includes("http") ? value.media : `${API_URL}${value.media}`}
                            alt={`${value.id}-${value.username}-media`}
                            // top
                            className="_card_media"
                        />
                        <CardTitle
                            className="_card_title"
                            tag="h5"
                        >
                            {value.username}
                        </CardTitle>
                        <CardSubtitle
                            className="d-flex justify-content-between align-items-center text-muted"
                            tag="h6"
                        >
                            <p
                                className="_card_cardsub_date"
                            >
                                {DateTime.fromISO(value.uploadDate).toFormat("FF")}
                            </p>
                            <p
                                className={props.displayLikes}
                            // className="_card_cardsub_likes"
                            >
                                <FavIcon
                                    className="_card_icon_allPost"
                                    fill="#e13b6e"
                                    onClick={() => handleLike(value.id)}
                                />
                                {value.numberOfLikes}
                            </p>
                        </CardSubtitle>
                    </Card>
                </CardColumns>
            )
        })
    }

    const printUnliked = () => {
        return props.unlikedPosts.map((value, index) => {
            return (
                <CardColumns
                    key={value.id}
                    className="col-12 col-md-6"
                >
                    <Card
                        className="border-0 shadow-sm"
                    >
                        <CardImg
                            onClick={() => navigate(`/postdetail?id=${value.id}`)}
                            src={value.media.includes("http") ? value.media : `${API_URL}${value.media}`}
                            alt={`${value.id}-${value.username}-media`}
                            // top
                            className="_card_media"
                        />
                        <CardTitle
                            className="_card_title"
                            tag="h5"
                        >
                            {value.username}
                        </CardTitle>
                        <CardSubtitle
                            className="d-flex justify-content-between align-items-center text-muted"
                            tag="h6"
                        >
                            <p
                                className="_card_cardsub_date"
                            >
                                {DateTime.fromISO(value.uploadDate).toFormat("FF")}
                            </p>
                            <p
                                className={props.displayLikes}
                            // className="_card_cardsub_likes"
                            >
                                <FavIcon
                                    className="_card_icon_allPost"
                                    fill="#351c75"
                                    onClick={() => handleLike(value.id)}
                                />
                                {value.numberOfLikes}
                            </p>
                        </CardSubtitle>
                    </Card>
                </CardColumns>
            )
        })
    }

    // const [dataPagination, setdataPagination] = useState([])
    // if (props.postsArr) {
    //     setdataPagination([...dataPagination, ...props.postsArr]);
    //     console.log("isi props.postsArr", props.postsArr);
    //     console.log("isi dataPagination", dataPagination);
    // }

    // untuk pagination all post
    const [postsArr, setPostsArr] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);
    // const [favColor, setFavColor] = useState("#351c75"); //warna unliked

    const getPostForFirstScroll = async () => {
        const res = await Axios.get(`${API_URL}/posts/paginate?_page=1`);
        const data = res.data;
        // setPostsArr(data);

        // let arrayLiked = posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1));
        // console.log("arrayLiked di getPostForFirstScroll", arrayLiked);

        // let arrayUnliked = posts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1));
        // console.log("arrayUnliked di getPostForFirstScroll", arrayUnliked);

        if (userid && likes.length > 0) {
            data.forEach(valFirstScroll => {
                arrLiked.forEach(valLikes => {
                    arrUnliked.forEach(valUnliked => {
                        if (valFirstScroll.id == valLikes.id) {
                            valFirstScroll.favcolor = "#e13b6e"
                        } else if (valFirstScroll.id == valUnliked.id) {
                            valFirstScroll.favcolor = "#351c75"
                        }
                    })
                })
            })
        } else {
            data.forEach(valFirstScroll => {
                valFirstScroll.favcolor = "#351c75"
            })
        }
        console.log("data bisa ditambah favcolor", data)
        setPostsArr([...data]);

        if (data.length === 0 || data.length < 4) {
            setHasMore(false);
        };
        setPageNumber(2);
    }

    const fetchNextPosts = async () => {
        const res = await Axios.get(`${API_URL}/posts/paginate?_page=${pageNumber}`);
        const data = res.data;

        // let arrayLiked = posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1));
        // console.log("arrayLiked di fetchNextPosts", arrayLiked);

        // let arrayUnliked = posts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1));
        // console.log("arrayUnliked di fetchNextPosts", arrayUnliked);

        if (userid && likes.length > 0) {
            data.forEach(valFirstScroll => {
                arrLiked.forEach(valLikes => {
                    arrUnliked.forEach(valUnliked => {
                        if (valFirstScroll.id == valLikes.id) {
                            valFirstScroll.favcolor = "#e13b6e"
                        } else if (valFirstScroll.id == valUnliked.id) {
                            valFirstScroll.favcolor = "#351c75"
                        }
                    })
                })
            })
        } else {
            data.forEach(valFirstScroll => {
                valFirstScroll.favcolor = "#351c75"
            })
        }

        return data;
    }

    const fetchData = async () => {
        const postsFromServer = await fetchNextPosts();
        console.log("isi postsFromServer", postsFromServer);
        setPostsArr([...postsArr, ...postsFromServer]);
        if (postsFromServer.length === 0 || postsFromServer.length < 4) {
            setHasMore(false);
        }
        let temp = pageNumber;
        temp++;
        console.log("isi increment temp", temp);
        setPageNumber(temp);
    }

    const printAllPosts = () => {
        // console.log("isi props.postsArr", props.postsArr);
        console.log("isi postsArr", postsArr);
        // console.log("isi posts di reducer saat ini", posts);
        // console.log("isi hasMore", props.hasMore);
        console.log("isi hasMore", hasMore);

        console.log("liked posts", props.likedData);
        console.log("unliked posts", props.unlikedPosts);


        return postsArr.map((valPaginate, idxPaginate) => {
            // props.likedData.forEach(valLikes => {
            //     if (valPaginate.id == valLikes.id) {
            //         console.log("valPaginate.id yg sama dgn valLikes.id", valPaginate.id)
            //     }

            console.log("valPaginate.favcolor", valPaginate.favcolor)
            return (
                <CardColumns
                    key={valPaginate.id}
                    className="col-12 col-md-6"
                >
                    <Card
                        className="border-0 shadow-sm"
                    >
                        <CardImg
                            onClick={() => navigate(`/postdetail?id=${valPaginate.id}`)}
                            src={valPaginate.media.includes("http") ? valPaginate.media : `${API_URL}${valPaginate.media}`}
                            alt={`${valPaginate.id}-${valPaginate.username}-media`}
                            // top
                            className="_card_media"
                        />
                        <CardTitle
                            className="_card_title"
                            tag="h5"
                        >
                            {valPaginate.username}
                        </CardTitle>
                        <CardSubtitle
                            className="d-flex justify-content-between align-items-center text-muted"
                            tag="h6"
                        >
                            <p
                                className="_card_cardsub_date"
                            >
                                {DateTime.fromISO(valPaginate.uploadDate).toFormat("FF")}
                            </p>
                            <p
                                className={props.displayLikes}
                            // className="_card_cardsub_likes"
                            >
                                <FavIcon
                                    className="_card_icon_allPost"
                                    fill={valPaginate.favcolor}
                                    onClick={() => handleLike(valPaginate.id)}
                                />
                                {valPaginate.numberOfLikes}
                            </p>
                        </CardSubtitle>
                    </Card>
                </CardColumns>
            )

            // })
        })
    }

    return (
        <div
        // className="row"
        // id="scrollableAllPost"
        >
            {/* {
                likes.length >= 0 && props.fromUrLikes == 0
                    ?
                    printUnliked()
                    :
                    null
            }
            {printLiked()}

            {printAllPosts()} */}

            {
                props.fromUrLikes == 0
                    ?
                    <>
                        <InfiniteScroll
                            dataLength={postsArr.length}
                            next={fetchData}
                            hasMore={hasMore}
                            loader={posts.length === 0
                                ?
                                null
                                :
                                <p
                                    style={{ textAlign: "center" }}
                                    className="gen_font_content"
                                >
                                    Loading...
                                </p>
                            }
                            endMessage={<p
                                style={{ textAlign: "center" }}
                                className="gen_font_content"
                            >End of post(s)...</p>}
                            scrollableTarget="scrollableAllPost"
                        >
                            <div
                                className="row"
                            >
                                {printAllPosts()}
                            </div>
                        </InfiniteScroll>
                    </>
                    :
                    <>
                        <div className="row">
                            {printLiked()}
                        </div>
                    </>
            }



        </div>
    )

}

export default CardsInAllPosts;