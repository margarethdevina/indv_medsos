import React from "react";
import { API_URL } from "../../helper";
import './_CardsInYourPosts.scss';
import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const CardsInYourPosts = (props) => {

    const navigate = useNavigate();
    // const endTime = DateTime.now().toFormat("FF");
    
    const printCard = () => {
        return props.data.map((value, index) => {
            // let startTime = "";
            // let endTime = "";

            // console.log("value.media", value.media);

            // console.log("DateTime Luxon", DateTime.fromISO(value.uploadDate).toFormat("FF"))
            // console.log("typeof DateTime Luxon", typeof(DateTime.fromISO(value.uploadDate)))
            
            // endTime = DateTime.now().toFormat("FF");
            // console.log("DateTime.now() Luxon", endTime);
            // console.log("typeof DateTime.now() Luxon", typeof(endTime));

            // startTime = DateTime.fromISO(value.uploadDate).toFormat("FF");

            console.log("diffTime", DateTime.now().diff(DateTime.fromISO(value.uploadDate), ['weeks', 'days', 'hours', 'minutes', 'seconds']).toObject());
            
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
                            // top
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
                                {/* <FavIcon
                                    className="_card_icon"
                                /> */}
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
            {printCard()}

        </div>
    )

}

export default CardsInYourPosts;