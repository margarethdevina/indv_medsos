import React from "react";
import './_CardUserProfile.scss';
import { ReactComponent as FavIcon } from '../../Assets/IconRef/love-letter.svg';
import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CardUserProfile = (props) => {

    const printCard = () => {
        <h1>Profile</h1>
        // return props.data.map((value, index) => {
        //     return (
        //     )
        // }
        // )
    }

    return (
        <div
            className="row"
        >
            {printCard()}

        </div>
    )

}

export default CardUserProfile;