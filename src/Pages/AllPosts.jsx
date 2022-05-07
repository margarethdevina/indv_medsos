import React, { useState, useEffect } from "react";
import CardsInAllPosts from "../Components/CardsInAllPosts/CardsInAllPosts";
import Axios from "axios";
import { API_URL } from "../helper";

const AllPostsPage = (props) => {

    const [dbPosts, setDbPosts] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = () => {
        Axios.get(`${API_URL}/posts`)
            .then((response) => {
                console.log("isi dbPosts", response.data)
                setDbPosts(response.data)
            }).catch((error) => { console.log(error) })
    }

    return (
        <div className="container pt-3 pb-3 px-5">

            <CardsInAllPosts
                data={dbPosts}
            />

        </div>
    )

}

export default AllPostsPage;