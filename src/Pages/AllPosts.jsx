import React, { useState, useEffect } from "react";
import CardsInAllPosts from "../Components/CardsInAllPosts/CardsInAllPosts";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";

const AllPostsPage = (props) => {

    const [dbPosts, setDbPosts] = useState([]); //ini mungkin dah ga perlu❗❗❗
    
    const [displayLikes, setDisplayLikes] = useState("_card_cardsub_likes");
    const [fromUrLikes, setFromUrLikes] = useState(0);
    // kalau fromUrLikes = 1, cardsinallpost component hanya print yg di liked aja

    // const [postsArr, setPostsArr] = useState([]);
    // const [hasMore, setHasMore] = useState(true);
    // const [pageNumber, setPageNumber] = useState(2);

    const { username, status, likes } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            status: state.usersReducer.status,
            likes: state.usersReducer.likes
        }
    })

    //ini mungkin dah ga perlu karena ambil aja dr reducer di cardsinallposts itu❗❗❗
    useEffect(() => {
        getPosts()
        // getPostForFirstScroll()
    }, []);

    //ini mungkin dah ga perlu karena ambil aja dr reducer di cardsinallposts itu❗❗❗
    const handleCallBack = (dataFromCards) => {
        if (dataFromCards.length > 0) {
            setDbPosts(dataFromCards)
        }
    }

    //ini mungkin dah ga perlu karena ambil aja dr reducer di cardsinallposts itu❗❗❗
    const getPosts = () => {
        Axios.get(`${API_URL}/posts/get`)
            .then((response) => {
                console.log("isi dbPosts", response.data)
                setDbPosts(response.data)
            }).catch((error) => { console.log(error) })
    };

    // const getPostForFirstScroll = async () => {
    //     const res = await Axios.get(`${API_URL}/posts/paginate?_page=1`);

    //     const data = res.data;
    //     setPostsArr(data);

    //     if (data.length === 0 || data.length < 4) {
    //         setHasMore(false);
    //     };

    //     setPageNumber(2);
    // }

    // const fetchNextPosts = async () => {
    //     const res = await Axios.get(`${API_URL}/posts/paginate?_page=${pageNumber}`);

    //     const data = res.data;
    //     return data;
    // }

    // const fetchData = async () => {
    //     const postsFromServer = await fetchNextPosts();
    //     console.log("isi postsFromServer", postsFromServer);

    //     setPostsArr([...postsArr, ...postsFromServer]);

    //     if (postsFromServer.length === 0 || postsFromServer.length < 4) {
    //         setHasMore(false);
    //     }

    //     let temp = pageNumber;
    //     temp++;
    //     console.log("isi increment temp", temp);
    //     setPageNumber(temp);
    // }

    const unlikedPosts = () => {
        let results = dbPosts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1));
        // console.log(results)

        return results
    }

    // console.log("isi unlikedPosts", unlikedPosts())

    //❗❗❗di cardsinallposts langsung filtering data yg diliked krn props dr sini skrg undefined terus
    const likedPosts = () => {
        // let temp = []
        // for (let i = 0; i < dbPosts.length; i++) {
        //     for (let j = 0; j < likes.length; j++) {
        //         if (dbPosts[i].id == likes[j]) {
        //             temp.push(dbPosts[i])
        //         }
        //     }
        // }
        // // console.log("isi temp", temp)
        // return temp

        let results = dbPosts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1));

        console.log("isi results likes", results)
        return results
    }

    // console.log("isi likedPosts",likedPosts())

    return (
        <div
            className="pt-3 pb-3 px-md-5"
            id="scrollableAllPost"
            style={{ height: "calc(100vh - 146px)", overflowY: "auto", overflowX: "hidden" }}
        >

            {/* title Leiden | All Posts */}


            {
                username
                    ?
                    status === "verified"
                        ?
                        <CardsInAllPosts
                            // data={dbPosts}
                            // firstScroll={getPostForFirstScroll}
                            // postsArr={postsArr}
                            // fetchData={fetchData}
                            // hasMore={hasMore}
                            likedData={likedPosts()}
                            unlikedPosts={unlikedPosts()}
                            displayLikes={displayLikes}
                            fromUrLikes={fromUrLikes}
                            handleCallBack={handleCallBack}
                        />
                        :
                        <>
                            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                                <span className="material-symbols-outlined">
                                    gpp_maybe
                                </span>
                            </span>
                            <h5>401 - Please verify your email first to access this page</h5>
                            <h5>To resend the verification link, please go to <i>Your Profile</i> page</h5>
                        </>
                    :
                    <>
                        <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                            <span className="material-symbols-outlined">
                                login
                            </span>
                        </span>
                        <h5>401 - Please sign in first to access this page</h5>
                    </>
            }

        </div>

    )

}

export default AllPostsPage;