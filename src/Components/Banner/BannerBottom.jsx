import React from "react";
import './_Banner.scss';
import { ReactComponent as FeelingIcon } from "../../Assets/IconRef/feeling.svg";
import { ReactComponent as EncourageIcon } from "../../Assets/IconRef/encourage_kindness.svg";
import { ReactComponent as WorldIcon } from "../../Assets/IconRef/world_globe.svg";

const BannerBottom = (props) => {

    return (
        <div className="app_banner_container">

            <p
                className="app_banner_font py-3"
                style={{ fontSize: 20, textDecorationLine: "underline" }}
            >
                About Leiden
            </p>

            <div className="app_banner_container_cards">

                    <div className="card">
                        <div className="card__icon">
                            <FeelingIcon fill="white" />
                        </div>
                        <p className="card__title">
                            Express yourself
                        </p>
                        <p className="card__info">
                            Express your thoughts and feelings with an image and words
                        </p>
                    </div>

                    <div className="card">
                        <div className="card__icon">
                            <EncourageIcon fill="white" />
                        </div>
                        <p className="card__title">
                            Encourage Kindness
                        </p>
                        <p className="card__info">
                            Be kind and polite with each other
                        </p>
                    </div>

                    <div className="card">
                        <div className="card__icon">
                            <WorldIcon fill="white" />
                        </div>
                        <p className="card__title">
                            Deliver Around the World
                        </p>
                        <p className="card__info">
                            Connect with people around the world
                        </p>

                    </div>
                    
                </div>

        </div>
    )

}

export default BannerBottom;