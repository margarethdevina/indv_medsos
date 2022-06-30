import React, { useState, useEffect } from "react";
import Axios from "axios";
import './_CardsInYourLikes.scss';
import { ReactComponent as FavIcon } from '../../Assets/IconRef/love-letter.svg';
import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from "../../helper";

import { DateTime } from "luxon";

const CardsInYourLikes = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userid, likes, posts } = useSelector((state) => {
        return {
            userid: state.usersReducer.id,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts
        }
    })

    // console.log("isi posts di reducer", posts);
    // console.log("isi likes di reducer", likes);

    const printLiked = () => {
        
        let results = posts.filter(({ id: id1 }) => likes.some((id2) => id2 === id1));
        
        return results.map((value, index) => {
            return (
                <CardColumns
                    key={value.id}
                    className="col-12 col-md-6"
                >
                    <Card
                        className="border-0 shadow-sm"
                    >
                        <CardImg
                            onClick={() => navigate(`/postdetail?id=${value.id}`)}
                            src={value.media.includes("http") ? value.media : `${API_URL}${value.media}`}
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
                                {DateTime.fromISO(value.uploadDate).toFormat("FF")}
                            </p>
                            <p
                                className={props.displayLikes}
                            >
                                <FavIcon
                                    className="_card_icon_allPost"
                                    fill="#e13b6e"
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
            {printLiked()}
        </div>
    )

}

export default CardsInYourLikes;