import React from "react";
import BannerTop from "../Components/Banner/BannerTop";
import BannerBottom from "../Components/Banner/BannerBottom";
import registPic from "../Assets/SampleMediaPosts/violet-register.jpg";
import { API_URL } from "../helper";
import { Helmet } from "react-helmet";

const LandingPage = (props) => {

    return (
        <div
            style={{ minHeight: "100vh" }}
        >
            {/* title Leiden | Home */}
            {/* meta property="og:" */}
            <Helmet
                // title="Leiden | Home"
                htmlAttributes={{ lang: "en" }}
                meta={[
                    {
                        property: "og:title",
                        content: "Leiden | Home"
                    },
                    {
                        property: "og:description",
                        content: "Leiden - a place to share your memories and thoughts"
                    },
                    {
                        property: "og:image",
                        content: <img src="../Assets/SampleMediaPosts/violet-register.jpg" />
                    }
                ]} />

            <BannerTop />

            <BannerBottom />

        </div >
    )

}

export default LandingPage;