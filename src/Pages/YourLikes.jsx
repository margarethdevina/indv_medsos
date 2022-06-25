import React, { useState } from "react";
import '../index.scss';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from "reactstrap";
import CardsInAllPosts from "../Components/CardsInAllPosts/CardsInAllPosts";
import { ReactComponent as FavIcon } from '../Assets/IconRef/love-letter.svg';

const YourLikesPage = (props) => {

    const navigate = useNavigate();

    const { username, status, likes, posts } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            status: state.usersReducer.status,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts
        }
    })

    const [displayLikes, setDisplayLikes] = useState("d-none _card_cardsub_likes")

    const [fromUrLikes, setFromUrLikes] = useState(1)

    console.log("data state yg masuk page yourLikes", username, likes, posts)

    const getYourLikes = () => {
        let temp = []
        for (let i = 0; i < posts.length; i++) {
            for (let j = 0; j < likes.length; j++) {
                if (posts[i].id == likes[j]) {
                    temp.push(posts[i])
                }
            }
        }
        // console.log("isi temp", temp)
        return temp
    }

    return (
        <div
            className="container border-0"
            style={{ minHeight: "100vh" }}
        >
            {
                username
                    ?
                    status === "verified"
                        ?
                        getYourLikes().length > 0
                            ?
                            <>
                                <Nav
                                    tabs
                                    className="border-0"
                                >
                                    <NavItem>
                                        <NavLink
                                            onClick={() => navigate("/yourposts")}
                                        >
                                            Your Posts
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className="active"
                                            onClick={() => navigate("/yourlikes")}
                                        >
                                            Your Likes
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <CardsInAllPosts
                                    data={getYourLikes()}
                                    displayLikes={displayLikes}
                                    fromUrLikes={fromUrLikes}
                                />
                            </>
                            :
                            <>
                                <Nav
                                    tabs
                                    className="border-0"
                                >
                                    <NavItem>
                                        <NavLink
                                            onClick={() => navigate("/yourposts")}
                                        >
                                            Your Posts
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className="active"
                                            onClick={() => navigate("/yourlikes")}
                                        >
                                            Your Likes
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <FavIcon
                                    fill="#351c75"
                                    width="150px"
                                    height="150px"
                                />
                                <h5>204 - No liked posts yet</h5>
                                <h5>Let's see others' posts and give them your love!</h5>
                            </>
                        :
                        <>
                            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                                <span class="material-symbols-outlined">
                                    gpp_maybe
                                </span>
                            </span>
                            <h5>401 - Please verify your email first to access this page</h5>
                            <h5>To resend the verification link, please go to <i>Your Profile</i> page</h5>
                        </>
                    :
                    <>
                        <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                            <span class="material-symbols-outlined">
                                login
                            </span>
                        </span>
                        <h5>401 - Please sign in first to access this page</h5>
                    </>
            }

            {/* <>
                <Nav
                    tabs
                    className="border-0"
                >
                    <NavItem>
                        <NavLink
                            onClick={() => navigate("/yourposts")}
                        >
                            Your Posts
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="active"
                            onClick={() => navigate("/yourlikes")}
                        >
                            Your Likes
                        </NavLink>
                    </NavItem>
                </Nav>

                <CardsInAllPosts
                    data={getYourLikes()}
                    displayLikes={displayLikes}
                    fromUrLikes={fromUrLikes}
                />
            </> */}

        </div>
    )

}

export default YourLikesPage;