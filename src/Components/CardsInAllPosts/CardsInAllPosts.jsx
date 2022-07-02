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

    const { userid, likes, posts } = useSelector((state) => {
        return {
            userid: state.usersReducer.id,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts
        }
    })

    console.log("isi posts di reducer", posts);
    console.log("isi likes di reducer", likes);
    console.log("isi props.likedData", props.likedData);
    console.log("isi props.unlikedData", props.unlikedData);   

    useEffect(() => {
        getPostForFirstScroll();
    }, []);

    const handleLike = (IdPost) => {
        let tempLike = [...likes];
        console.log("tempLike di handleLike", tempLike);

        // let tempPosts = [...posts];
        let token = localStorage.getItem("tokenIdUser");

        if (!tempLike.includes(IdPost)) {
            tempLike.push(IdPost);

            //axios patch user likes
            if (token) {
                let formData = new FormData();
                let data = { likes: tempLike };
                console.log("data yg akan diappend", data);
                formData.append('data', JSON.stringify(data));
                Axios.patch(`${API_URL}/users/edit`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    dispatch(updateLikesAction(res.data));
                    // console.log("respon dari klik like", res.data);
                    setHasMore(true);
                    getPostForFirstScroll(
                        res.data,
                        posts.filter(({ id: id1 }) => res.data.some((id2) => id2 === id1)),
                        posts.filter(({ id: id1 }) => !res.data.some((id2) => id2 === id1))
                    );
                    
                }).catch((err) => {
                    console.log(err)
                })
            };

        } else {
            let idxInLikes = tempLike.indexOf(IdPost);
            tempLike.splice(idxInLikes, 1);
            console.log("tempLike setelah coba unlike", tempLike)

            //axios patch user likes
            if (token) {
                let formData = new FormData();
                let data = { likes: tempLike };
                console.log("data yg akan diappend", data);
                formData.append('data', JSON.stringify(data));
                Axios.patch(`${API_URL}/users/edit`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    dispatch(updateLikesAction(res.data));
                    // console.log("respon dari klik like", res.data);
                    setHasMore(true);
                    getPostForFirstScroll(
                        res.data,
                        posts.filter(({ id: id1 }) => res.data.some((id2) => id2 === id1)),
                        posts.filter(({ id: id1 }) => !res.data.some((id2) => id2 === id1))
                    );
                    // getArray();
                    // setArrLiked(props.likedData);
                    // setArrLiked(posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1)));
                    // console.log("arrLiked setelah klik", arrLiked);
                    // setArrUnliked(props.unlikedData);
                    // setArrUnliked(posts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1)));
                    // console.log("arrUnliked setelah klik", arrUnliked);

                    // console.log("isi post di reducer stlh klik", posts);
                    // console.log("isi postsArr stlh klik", postsArr);

                    // printAllPosts();

                }).catch((err) => {
                    console.log(err)
                })

            };
        }

    }
    
    // untuk pagination all post
    const [postsArr, setPostsArr] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);
    

    const getPostForFirstScroll = async (newLikes = likes, arrLiked = props.likedData, arrUnliked = props.unlikedData) => {

        console.log("isi newLikes di getPostForFirstScroll", newLikes);
        console.log("isi arrLiked di getPostForFirstScroll", arrLiked);
        console.log("isi arrUnliked di getPostForFirstScroll", arrUnliked);
        
        const res = await Axios.get(`${API_URL}/posts/paginate?_page=1`);
        const data = res.data;

        if (data) {

            console.group("isi likes dr reducer di getPostForFirstScroll", likes);
            console.log("isi props.likedData di getPostForFirstScroll", props.likedData);
            console.log("isi props.unlikedData di getPostForFirstScroll", props.unlikedData);

            if (userid && newLikes.length > 0) {
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
    }

    const fetchNextPosts = async () => {
        const res = await Axios.get(`${API_URL}/posts/paginate?_page=${pageNumber}`);
        const data = res.data;

        if (userid && likes.length > 0) {
            data.forEach(valFirstScroll => {
                props.likedData.forEach(valLikes => {
                    props.unlikedData.forEach(valUnliked => {
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
        console.log("isi postsArr di printAllPosts", postsArr);
        // console.log("isi posts di reducer saat ini", posts);
        // console.log("isi hasMore", props.hasMore);
        console.log("isi hasMore di printAllPosts", hasMore);

        console.log("isi likes di di printAllPosts", likes);

        console.log("isi dr props.likedData di printAllPosts", props.likedData);
        console.log("isi dr props.unlikedData di printAllPosts", props.unlikedData);


        return postsArr.map((valPaginate, idxPaginate) => {
            
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
        <div>
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

        </div>
    )

}

export default CardsInAllPosts;