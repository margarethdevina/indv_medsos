import React from "react";
import { API_URL } from "../../helper";
import './_CardsInUserProfile.scss';
import { ReactComponent as FavIcon } from '../../Assets/IconRef/love-letter.svg';
// import { CardColumns, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CardsInUserProfile = (props) => {

    const navigate = useNavigate();

    const printCard = () => {

        return props.data.map((value, index) => {

            return (
                <img
                    className="singleImage"
                    src={value.media.includes("http") ? value.media : `${API_URL}${value.media}`}
                    alt={`${value.id}-${value.username}-media`}
                    key={index}
                    onClick={() => navigate(`/postdetail?id=${value.id}`)}
                />
            )
        }
        )
    }

    return (
        <div
            className="text-align-center"
        >
            {
                props.data.length > 0
                    ?
                    <>
                        {printCard()}
                    </>
                    :
                    props.selectedPostMenu == 0
                        ?
                        <>
                            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                                <span className="material-symbols-outlined">
                                    post_add
                                </span>
                            </span>
                            <h5>204 - No posts yet</h5>
                            <h5>Let's tell the world what's in your mind and heart by creating a new post...</h5>
                        </>
                        :
                        <>
                            <FavIcon
                                fill="#351c75"
                                width="150px"
                                height="150px"
                            />
                            <h5>204 - No liked posts yet</h5>
                            <h5>Let's see others' posts and give them your love!</h5>
                        </>
            }

        </div>
    )

}

export default CardsInUserProfile;