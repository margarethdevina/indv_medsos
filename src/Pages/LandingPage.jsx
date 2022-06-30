import React from "react";
import BannerTop from "../Components/Banner/BannerTop";
import BannerBottom from "../Components/Banner/BannerBottom";

const LandingPage = (props) => {

    return (
        <div
            style={{ minHeight: "100vh" }}
        >
            {/* title Leiden | Home */}
            {/* meta property="og:" */}

            <BannerTop />

            <BannerBottom />

        </div>
    )

}

export default LandingPage;