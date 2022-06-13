import React, { useState, useEffect } from "react";
import CardsInAllPosts from "../Components/CardsInAllPosts/CardsInAllPosts";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';

const AllPostsPage = (props) => {

    const [dbPosts, setDbPosts] = useState([]);
    const [displayLikes, setDisplayLikes] = useState("_card_cardsub_likes")
    const [fromUrLikes, setFromUrLikes] = useState(0)

    const { likes } = useSelector((state) => {
        return {
            likes: state.usersReducer.likes
        }
    })

    useEffect(() => {
        getPosts()
    }, []);

    const handleCallBack = (dataFromCards) => {
        if(dataFromCards.length>0){
            setDbPosts(dataFromCards)
        }
    }

    const getPosts = () => {
        Axios.get(`${API_URL}/posts/get`)
            .then((response) => {
                console.log("isi dbPosts", response.data)
                setDbPosts(response.data)
            }).catch((error) => { console.log(error) })
    };

    const unlikedPosts = () => {
        let results = dbPosts.filter(({ id: id1 }) => !likes.some((id2) => id2 === id1));
        // console.log(results)

        return results
    }

    // console.log("isi unlikedPosts", unlikedPosts())

    const likedPosts = () => {
        let temp = []
        for (let i = 0; i < dbPosts.length; i++) {
            for (let j = 0; j < likes.length; j++) {
                if (dbPosts[i].id == likes[j]) {
                    temp.push(dbPosts[i])
                }
            }
        }
        // console.log("isi temp", temp)
        return temp
    }

    // console.log("isi likedPosts",likedPosts())

    return (
        <div className="container pt-3 pb-3 px-md-5">

            <CardsInAllPosts
                // data={dbPosts}
                data={likedPosts()}
                unlikedPosts={unlikedPosts()}
                displayLikes={displayLikes}
                fromUrLikes={fromUrLikes}
                handleCallBack = {handleCallBack}
            />

        </div>
    )

}

export default AllPostsPage;