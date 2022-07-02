import React from "react";
import '../index.scss';
import { useSelector } from 'react-redux';
import MetaDecorator from "../Components/MetaDecorator";

const NotFoundPage = (props) => {
    const { username, status } = useSelector((state) => {
        return {
            username: state.usersReducer.status,
            status: state.usersReducer.status
        }
    })

    return (
        <div
            className="gen_font"
            style={{ minHeight: "100vh" }}
        >

            {/* title Leiden | Not Found */}
            <MetaDecorator
                title="Leiden | Not Found"
                meta={[
                    {
                        property: "og:title",
                        content: "Leiden | Not Found"
                    },
                    {
                        property: "og:type",
                        content: "website"
                    },
                    {
                        property: "og:description",
                        content: "Leiden - The page you were looking for doesn't exist"
                    },
                    // {
                    //     property: "og:image",
                    //     content: "https://www.ixpaper.com/wp-content/uploads/2021/06/violet-evergarden-wallpaper-ixpaper-3.jpg"
                    //     // content: "../Assets/SampleMediaPosts/violet-register-resized.jpg"
                    // },
                    // {
                    //     property: "og:image:width",
                    //     content: "300"
                    // },
                    // {
                    //     property: "og:image:height",
                    //     content: "300"
                    // },
                    // {
                    //     property: "og:url",
                    //     content: "http://localhost:3001/allposts"
                    // },
                    // {
                    //     property: "twitter:card",
                    //     content: "summary_large_image"
                    // },
                    {
                        property: "twitter:title",
                        content: "Leiden | Not Found"
                    },
                    {
                        property: "twitter:description",
                        content: "Leiden - The page you were looking for doesn't exist"
                    },
                    // {
                    //     property: "twitter:url",
                    //     content: "http://localhost:3001/allposts"
                    // },
                    // {
                    //     property: "twitter:image",
                    //     content: "https://www.ixpaper.com/wp-content/uploads/2021/06/violet-evergarden-wallpaper-ixpaper-3.jpg"
                    //     // content: "../Assets/SampleMediaPosts/violet-register-resized.jpg"
                    // }
                ]} />

            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                search_off
            </span>
            <h4>404 - The page you were looking for doesn't exist</h4>

            {/* {username
                ?
                <>
                    <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                        search_off
                    </span>
                    <h4>403 - Your account already registered and signed in</h4>
                </>
                :
                <>
                    <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                        search_off
                    </span>
                    <h4>404 - The page you were looking for doesn't exist</h4>
                </>
            } */}
        </div>
    )

}

export default NotFoundPage;