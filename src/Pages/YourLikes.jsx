import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from "reactstrap";
import CardsInAllPosts from "../Components/CardsInAllPosts/CardsInAllPosts";

const YourLikesPage = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username, likes, posts } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts
        }
    })

    const [displayLikes, setDisplayLikes] = useState("d-none _card_cardsub_likes")

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
            className="container"
        >
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className=""
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
                displayLikes = {displayLikes}
            />

        </div>
    )

}

export default YourLikesPage;