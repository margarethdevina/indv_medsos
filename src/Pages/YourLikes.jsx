import React, { useState } from "react";
import '../index.scss';
import { API_URL } from "../helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from "reactstrap";
import CardsInYourLikes from "../Components/CardsForYourLikes/CardsInYourLikes";
import { ReactComponent as FavIcon } from '../Assets/IconRef/love-letter.svg';
import MetaDecorator from "../Components/MetaDecorator";

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

    return (
        <div
            className="container border-0"
            style={{ minHeight: "100vh" }}
        >

            {/* title Leiden | Your Likes */}
            <MetaDecorator
                title="Leiden | Your Likes"
                description="Do you want to share some love again today? We are waiting for you :D"
                contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_YOURLIKES.jpg`}
            // contentWebUrl="http://localhost:3001/yourlikes"
            />

            {
                username
                    ?
                    status === "verified"
                        ?
                        likes.length > 0
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

                                <CardsInYourLikes
                                    displayLikes={displayLikes}
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

export default YourLikesPage;