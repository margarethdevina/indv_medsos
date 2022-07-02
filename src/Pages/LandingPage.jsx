import React from "react";
import BannerTop from "../Components/Banner/BannerTop";
import BannerBottom from "../Components/Banner/BannerBottom";
import registPic from "../Assets/SampleMediaPosts/violet-register-resized.jpg";
import { API_URL } from "../helper";
import MetaDecorator from "../Components/MetaDecorator";

const LandingPage = (props) => {

    return (
        <div
            style={{ minHeight: "100vh" }}
        >
            {/* title Leiden | Home */}
            <MetaDecorator
                title="Leiden | Home"
                description="Leiden - a place to share your memories and thoughts"
                // contentImg="https://www.ixpaper.com/wp-content/uploads/2021/06/violet-evergarden-wallpaper-ixpaper-3.jpg"
                contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_HOME.jpg`}
                // contentWebUrl="http://localhost:3001/"
            />

            <BannerTop />

            <BannerBottom />

        </div >
    )

}

export default LandingPage;