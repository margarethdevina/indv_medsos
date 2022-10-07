import React from "react";
import { API_URL } from "../../helper";
import './_CardsInYourPosts.scss';
import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const CardsInYourPosts = (props) => {

    const navigate = useNavigate();

    const printCard = () => {
        return props.data.map((value, index) => {

            // console.log("diffTime", DateTime.now().diff(DateTime.fromISO(value.uploadDate), ['weeks', 'days', 'hours', 'minutes', 'seconds']).toObject());

            return (
                <CardColumns
                    key={value.id}
                    className="col-12 col-md-6"
                >
                    <Card
                        className="border-0 shadow-sm"
                        onClick={() => navigate(`/postdetail?id=${value.id}`)}
                    >
                        <CardImg
                            src={value.media.includes("http") ? value.media : `${API_URL}${value.media}`}
                            alt={`${value.id}-${value.username}-media`}
                            className="_card_media"
                        />

                        <CardSubtitle
                            className="d-flex justify-content-between align-items-center text-muted pt-2"
                            tag="h6"
                        >
                            <p
                                className="_card_cardsub_date"
                            >{DateTime.fromISO(value.uploadDate).toFormat("FF")}</p>
                            <p
                                className="_card_cardsub_likes"
                            >
                                Liked by {value.numberOfLikes} people
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
            {
                props.data.length > 0
                    ?
                    <>
                        {printCard()}
                    </>
                    :
                    <>
                        <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                            <span className="material-symbols-outlined">
                                post_add
                            </span>
                        </span>
                        <h5>204 - No posts yet</h5>
                        <h5>Let's tell the world what's in your mind and heart by creating a new post...</h5>
                    </>
            }

        </div>
    )

}

export default CardsInYourPosts;