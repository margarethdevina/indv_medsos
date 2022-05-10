import React, { useState, useEffect } from "react";
import './_PostDetail.scss';
import { ReactComponent as FavIcon } from '../Assets/IconRef/love-letter.svg';
import { ReactComponent as ShareIcon } from '../Assets/IconRef/share.svg';
import Axios from 'axios';
import { API_URL } from "../helper";
import { useLocation } from "react-router-dom";
import { Input, Button } from "reactstrap";

const PostDetailPage = (props) => {

    const { state, search } = useLocation();
    const [detail, setDetail] = useState({});
    const [favoriteFill, setFavoriteFill] = useState("#351c75");

    useEffect(() => {
        getDetail()
    }, []);

    const getDetail = () => {
        Axios.get(`${API_URL}/posts${search}`)
            .then((response) => {
                // console.log("isi detail", response.data)
                setDetail(response.data[0])
                console.log("isi detail.comments", detail.comments)
            })
            .catch((error) => { console.log(error) })
    };


    const printComments = () => {
        if (detail.id) {
            let dbComments = detail.comments
            console.log("isi dbComments", dbComments)
            dbComments.map((value, index) => {
                return (
                    <>
                        <div
                            className="d-flex"
                        >
                            <span>
                                {value.username}
                            </span>
                            <span>
                                {value.comment}
                            </span>
                        </div>
                        <div>
                            <span>
                                {value.commentDate}
                            </span>
                        </div>
                    </>)
            })
        }
    }

    return (
        <div
            className="row container py-3 mx-auto"
        >
            <div
                className="col-12 col-md-7 order-md-1"
            >
                <img
                    src={detail.media}
                    alt={`${detail.id}-${detail.uploadDate}-media`}
                    width="100%"
                />
            </div>

            <div
                className="col-12 col-md-5 order-md-2"
            >
                <p
                    className="_detail_font"
                >
                    {detail.username}
                </p>

                <hr className="_detail_hr" />

                <p
                    className="_detail_font_content"
                >
                    {detail.caption}
                </p>

                <hr className="_detail_hr" />

                <p
                    className="_detail_font_content"
                >
                    <FavIcon
                        fill="#e13b6e"
                        width="22px"
                        height="22px"
                        className="me-3"
                        style={{ cursor: "pointer" }}
                    />

                    <ShareIcon
                        fill="#351c75"
                        width="22px"
                        height="22px"
                        style={{ cursor: "pointer" }}
                    />


                </p>

                <hr className="_detail_hr" />

                {/* <p
                    className="_detail_font_content"
                > */}
                {
                    detail.id
                        ?
                        <>
                            {/* printComments */}
                            {printComments()}
                        </>
                        :
                        null
                }
                {/* </p> */}

                <hr className="_detail_hr" />

                <div
                    className="row mx-auto"
                >
                    <Input
                        className="col-12 col-md-10 w-75 mb-2"
                        type="text"
                        placeholder="share your thought..."
                        size="md"
                        style={{height: "2.5rem"}}
                    />

                    <Button
                        className="col-12 col-md-2 text-center _detail_button"
                    >
                        Post
                    </Button>

                </div>

            </div>

        </div>
    )

}

export default PostDetailPage;