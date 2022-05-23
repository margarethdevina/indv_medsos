import React, { useState, useEffect } from "react";
import './_CardsInAllPosts.scss';
import { ReactComponent as FavIcon } from '../../Assets/IconRef/love-letter.svg';
import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const CardsInAllPosts = (props) => {

    const navigate = useNavigate();

    const [fillFave, setFillFave] = useState("#000000")
    // "#e13b6e"

    const { username, likes } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            likes: state.usersReducer.likes
        }
    })

    // const handleFill = () => {
    //     if (likes.length > 0) {
    //         for (let i = 0; i < props.data.length; i++) {
    //             for (let j = 0; j < likes.length; j++) {
    //                 if (props.data[i].id === likes[j]) {
    //                     setFillFave("#e13b6e")
    //                 }
    //             }
    //         }
    //     }
    // }

    const printLiked = () => {

        return props.data.map((value, index) => {

            return (
                <CardColumns
                    key={value.id}
                    className="col-12 col-md-6"
                >
                    <Card
                        onClick={() => navigate(`/postdetail?id=${value.id}`)}
                    >
                        <CardImg
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
                        onClick={() => navigate(`/postdetail?id=${value.id}`)}
                    >
                        <CardImg
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
                                    fill="#000000"
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
                likes.length > 0 && props.fromUrLikes == 0
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