import React, { useState, useEffect } from "react";
import '../index.scss';
import Axios from 'axios';
import { API_URL } from "../helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from "reactstrap";
import CardsInYourPosts from "../Components/CardsInYourPosts/CardsInYourPosts";

const YourPostsPage = (props) => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dbPosts, setDbPosts] = useState([]);

    useEffect(() => {
        getPosts()
    }, []);

    const getPosts = () => {
        Axios.get(`${API_URL}/posts`)
            .then((response) => {
                console.log("isi dbPosts", response.data)
                setDbPosts(response.data)
            }).catch((error) => { console.log(error) })
    };

    const { username } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
        }
    })

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
                        className="active"
                        onClick={() => navigate("/yourposts")}
                    >
                        Your Posts
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => navigate("/yourlikes")}
                    >
                        Your Likes
                    </NavLink>
                </NavItem>
            </Nav>

            <CardsInYourPosts 
            data = {dbPosts.filter(val => val.username === username)}
            />
        </div>
    )

}

export default YourPostsPage;