import React from "react";
import './_CardsInYourPosts.scss';
import { ReactComponent as FavIcon } from '../../Assets/IconRef/love-letter.svg';
import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CardsInYourPosts = (props) => {

    const navigate = useNavigate();

    const printCard = () => {
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

                        <CardSubtitle
                            className="d-flex justify-content-between align-items-center text-muted pt-2"
                            tag="h6"
                        >
                            <p
                                className="_card_cardsub_date"
                            >{value.uploadDate}</p>
                            <p
                                className="_card_cardsub_likes"
                            >
                                <FavIcon
                                    className="_card_icon"
                                />
                                {value.numberOfLikes}
                            </p>
                        </CardSubtitle>
                    </Card>
                </CardColumns>
            )
        }
        )
    }

    return (
        <div
            className="row"
        >
            {printCard()}

        </div>
    )

}

export default CardsInYourPosts;