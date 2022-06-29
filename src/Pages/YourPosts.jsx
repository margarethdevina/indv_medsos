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

    const { username, status } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            status: state.usersReducer.status
        }
    })

    console.log("username di reducer masih ada?",username)
    const [dbPosts, setDbPosts] = useState([]);

    useEffect(() => {
        getPosts()
    }, []);

    const getPosts = () => {
        Axios.get(`${API_URL}/posts/get`)
            .then((response) => {
                console.log("isi dbPosts", response.data)
                setDbPosts(response.data)
            }).catch((error) => { console.log(error) })
    };


    return (
        <div
            className="container border-0"
            style={{minHeight:"100vh"}}
        >
            {
                username
                    ?
                    status === "verified"
                        ?
                        <>
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
                                data={dbPosts.filter(val => val.username === username)}
                            />
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

export default YourPostsPage;