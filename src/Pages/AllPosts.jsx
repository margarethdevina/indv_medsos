import React, { useState, useEffect } from "react";
import CardsInAllPosts from "../Components/CardsInAllPosts/CardsInAllPosts";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';
import MetaDecorator from "../Components/MetaDecorator";

const AllPostsPage = (props) => {

    const [dbPosts, setDbPosts] = useState([]); //ini mungkin dah ga perlu❗❗❗

    const [displayLikes, setDisplayLikes] = useState("_card_cardsub_likes");
    const [fromUrLikes, setFromUrLikes] = useState(0);
    // kalau fromUrLikes = 1, cardsinallpost component hanya print yg di liked aja

    const { username, status, likes, posts } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            status: state.usersReducer.status,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts
        }
    })


    return (
        <div
            className="pt-3 pb-3 px-md-5"
            id="scrollableAllPost"
            style={{ height: "calc(100vh - 146px)", overflowY: "auto", overflowX: "hidden" }}
        >

            {/* title Leiden | All Posts */}
            <MetaDecorator
                title="Leiden | All Posts"
                description="Come and see yours and your friends' posts"
                contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_ALLPOSTS.jpg`}
                // contentWebUrl="http://localhost:3001/allposts"
            />

            {
                username
                    ?
                    status === "verified"
                        ?
                        <CardsInAllPosts

                            likedData={posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1))}

                            unlikedData={posts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1))}

                            displayLikes={displayLikes}
                            fromUrLikes={fromUrLikes}

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