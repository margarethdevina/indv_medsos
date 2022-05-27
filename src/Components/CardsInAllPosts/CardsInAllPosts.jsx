import React, { useState, useEffect } from "react";
import Axios from "axios";
import './_CardsInAllPosts.scss';
import { ReactComponent as FavIcon } from '../../Assets/IconRef/love-letter.svg';
import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from "../../helper";
import { getPostsAction } from "../../redux/actions/postsActions";
import { loginAction, updateLikesAction } from "../../redux/actions/usersActions";

const CardsInAllPosts = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userid, likes, posts } = useSelector((state) => {
        return {
            userid: state.usersReducer.id,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts
        }
    })

    const handleLike = (IdPost) => {
        let tempLike = [...likes];
        let tempPosts = [...posts];
        if (!tempLike.includes(IdPost)) {
            tempLike.push(IdPost);
            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);
            console.log("index di post", idxInPost)
            console.log("NOL di post itu saat ini", tempPosts[idxInPost].numberOfLikes)
            let tempNoOfLikes = tempPosts[idxInPost].numberOfLikes;
            tempNoOfLikes++;
            console.log("number of likes nambah?", tempNoOfLikes)

            //axios patch user likes
            Axios.patch(`${API_URL}/users/${userid}`, {
                likes: tempLike
            }).then((res) => {
                dispatch(updateLikesAction(res.data.likes))

                //axios patch posts number of likes
                updateNumberofLikes(IdPost, tempNoOfLikes)
            }).catch((err) => {
                console.log(err)
            });

        } else {
            let idxInLikes = tempLike.indexOf(IdPost);
            tempLike.splice(idxInLikes, 1);
            let idxInPost = tempPosts.findIndex(val => val.id == IdPost);
            let tempNoOfLikes = tempPosts[idxInPost].numberOfLikes;
            tempNoOfLikes--;
            console.log("number of likes berkurang?", tempNoOfLikes)

            //axios patch user likes
            Axios.patch(`${API_URL}/users/${userid}`, {
                likes: tempLike
            }).then((res) => {
                dispatch(updateLikesAction(res.data.likes))

                //axios patch posts number of likes
                updateNumberofLikes(IdPost, tempNoOfLikes)
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    const updateNumberofLikes = (Id, tempNoOfLikes) => {
        Axios.patch(`${API_URL}/posts/${Id}`, {
            numberOfLikes: tempNoOfLikes
        }).then((res) => {
            getPosts()
        }).catch((err) => {
            console.log(err)
        })
    }

    const getPosts = () => {
        Axios.get(`${API_URL}/posts`)
            .then((response) => {
                dispatch(getPostsAction(response.data))
                props.handleCallBack(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const printLiked = () => {
        return props.data.map((value, index) => {
            return (
                <CardColumns
                    key={value.id}
                    className="col-12 col-md-6"
                >
                    <Card
                    >
                        <CardImg
                            onClick={() => navigate(`/postdetail?id=${value.id}`)}
                            src={value.media}
                            alt={`${value.id}-${value.username}-media`}
                            // top
                            className="_card_media"
                        />
                        <CardTitle
                            className="_card_title"
                            tag="h5"
                        >
                            {value.username}
                        </CardTitle>
                        <CardSubtitle
                            className="d-flex justify-content-between align-items-center text-muted"
                            tag="h6"
                        >
                            <p
                                className="_card_cardsub_date"
                            >
                                {value.uploadDate}
                            </p>
                            <p
                                className={props.displayLikes}
                            // className="_card_cardsub_likes"
                            >
                                <FavIcon
                                    className="_card_icon_allPost"
                                    fill="#e13b6e"
                                    onClick={() => handleLike(value.id)}
                                />
                                {value.numberOfLikes}
                            </p>
                        </CardSubtitle>
                    </Card>
                </CardColumns>
            )
        })
    }

    const printUnliked = () => {
        return props.unlikedPosts.map((value, index) => {
            return (
                <CardColumns
                    key={value.id}
                    className="col-12 col-md-6"
                >
                    <Card
                    >
                        <CardImg
                            onClick={() => navigate(`/postdetail?id=${value.id}`)}
                            src={value.media}
                            alt={`${value.id}-${value.username}-media`}
                            // top
                            className="_card_media"
                        />
                        <CardTitle
                            className="_card_title"
                            tag="h5"
                        >
                            {value.username}
                        </CardTitle>
                        <CardSubtitle
                            className="d-flex justify-content-between align-items-center text-muted"
                            tag="h6"
                        >
                            <p
                                className="_card_cardsub_date"
                            >
                                {value.uploadDate}
                            </p>
                            <p
                                className={props.displayLikes}
                            // className="_card_cardsub_likes"
                            >
                                <FavIcon
                                    className="_card_icon_allPost"
                                    fill="#351c75"
                                    onClick={() => handleLike(value.id)}
                                />
                                {value.numberOfLikes}
                            </p>
                        </CardSubtitle>
                    </Card>
                </CardColumns>
            )
        })
    }

    return (
        <div
            className="row"
        >
            {
                likes.length >= 0 && props.fromUrLikes == 0
                    ?
                    printUnliked()
                    :
                    null
            }
            {printLiked()}

        </div>
    )

}

export default CardsInAllPosts;