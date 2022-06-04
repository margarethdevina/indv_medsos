import React, { useState } from "react";
import '../index.scss';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from "reactstrap";
import CardsInAllPosts from "../Components/CardsInAllPosts/CardsInAllPosts";

const YourLikesPage = (props) => {

    const navigate = useNavigate();

    const { username, likes, posts } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
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
        >
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

        </div>
    )

}

export default YourLikesPage;