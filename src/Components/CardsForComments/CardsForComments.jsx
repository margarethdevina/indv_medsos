import React from "react";
import './_CardsForComments.scss';
import { ReactComponent as ThreeDotsIcon } from '../../Assets/IconRef/more-with-three-dots-button.svg';
import { ReactComponent as EditIcon } from '../../Assets/IconRef/edit.svg';
import { ReactComponent as BinIcon } from '../../Assets/IconRef/garbage.svg';
import { CardColumns, Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useDispatch } from 'react-redux';

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
                        className="_card_border"
                    >
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
                            <br />
                            <span
                                className="_card_detail_date me-2"
                            >
                                {value.commentDate}
                            </span>
                            {
                                value.username == props.loginUsername &&
                                <>
                                    <EditIcon
                                        className="me-2"
                                        fill="#351c75"
                                        width="10px"
                                        height="10px"
                                        style={{ cursor: "pointer" }}
                                    />
                                    <BinIcon
                                        fill="#351c75"
                                        width="10px"
                                        height="10px"
                                        style={{ cursor: "pointer" }}
                                    />
                                </>
                            }
                    </CardBody>
                </Card>
                </CardColumns >
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