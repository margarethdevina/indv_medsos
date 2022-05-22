import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from "reactstrap";
import CardsInYourPosts from "../Components/CardsInYourPosts/CardsInYourPosts";

const YourPostsPage = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username, posts } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            posts: state.postsReducer.posts
        }
    })

    console.log("data state yg masuk page yourPosts", username, posts)

    const printYourPosts = () => {
        if (username){
            let temp = []
            temp = posts.filter(val => val.username == username)
            console.log("isi temp", temp)
        }
    }

    return (
        <div
        className="container"
        >
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className="active"
                        onClick={() => navigate("/yourposts")}
                    >
                        Your Posts
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className=""
                        onClick={() => navigate("/yourlikes")}
                    >
                        Your Likes
                    </NavLink>
                </NavItem>
            </Nav>

            {printYourPosts()}
            <CardsInYourPosts 
            data = {posts.filter(val => val.username == username)}
            />
        </div>
    )

}

export default YourPostsPage;