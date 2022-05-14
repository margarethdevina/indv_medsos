import React from "react";
import './_CardsForComments.scss';
import { CardColumns, Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const CardsForComments = (props) => {

    let data = props.detail.comments

    const printCard = () => {
        return data.map((value, index) => {
            return (
                <CardColumns
                    key={value.id}
                    className="col-12"
                >
                    <Card
                    >
                        {/* <CardImg
                            src={value.media}
                            alt={`${value.id}-${value.username}-profile`}
                            // left
                            className="_card_profile"
                        /> */}
                        <CardBody>
                            <span
                                className="_card_detail_username"
                            >
                                {value.username}
                            </span>
                            <span
                                className="_card_detail_comment"
                            >
                                {value.comment}
                            </span>
                            <p
                                className="_card_detail_date"
                            >
                                {value.commentDate}
                            </p>
                        </CardBody>
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

export default CardsForComments;