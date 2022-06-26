import React from "react";
import BannerTop from "../Components/Banner/BannerTop";
import BannerBottom from "../Components/Banner/BannerBottom";

const LandingPage = (props) => {

    return (
        <div
            style={{ minHeight: "100vh" }}
        >

            <BannerTop />

            <BannerBottom />

        </div>
    )

}

export default LandingPage;