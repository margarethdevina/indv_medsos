import React, { useState, useEffect } from "react";
import CardsInAllPosts from "../Components/CardsInAllPosts/CardsInAllPosts";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';

const AllPostsPage = (props) => {

    const [dbPosts, setDbPosts] = useState([]);
    const [displayLikes, setDisplayLikes] = useState("_card_cardsub_likes")
    const [fromUrLikes, setFromUrLikes] = useState(0)

    const { username, status, likes } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            status: state.usersReducer.status,
            likes: state.usersReducer.likes
        }
    })

    useEffect(() => {
        getPosts()
    }, []);

    const handleCallBack = (dataFromCards) => {
        if (dataFromCards.length > 0) {
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
        <div className="container pt-3 pb-3 px-md-5" style={{ minHeight: "100vh" }}>

            {
                username
                    ?
                    <CardsInAllPosts
                        // data={dbPosts}
                        data={likedPosts()}
                        unlikedPosts={unlikedPosts()}
                        displayLikes={displayLikes}
                        fromUrLikes={fromUrLikes}
                        handleCallBack={handleCallBack}
                    />
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

            {/* <CardsInAllPosts
                // data={dbPosts}
                data={likedPosts()}
                unlikedPosts={unlikedPosts()}
                displayLikes={displayLikes}
                fromUrLikes={fromUrLikes}
                handleCallBack={handleCallBack}
            /> */}

        </div>
    )

}

export default AllPostsPage;