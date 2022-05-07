import React from "react";
import imgBanner from "../../Assets/BannerTopRef/BannerTop0.PNG";
import './_Banner.scss';

const BannerTop = (props) => {

    return (
        <div
            className="row py-2 app_banner_bg align-items-center"
        >

            <div className="col-12 col-md-6 order-md-2 py-1">
                <img
                    src={imgBanner}
                    width="95%"
                    alt=""
                />
            </div>

            <div className="col-12 col-md-6 order-md-1 py-1">

                <div className="container text-start py-1">
                    <p
                        className="blockquote app_banner_font"
                    >
                        “Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever… It remembers little things, long after you have forgotten everything.”

                    </p>
                    <p
                        className="blockquote-footer app_banner_fontFooter"
                    >
                        Aaron Siskind, <cite title="firstSource">an American photographer</cite>
                    </p>
                </div>

                <div className="container text-end py-1">
                    <p
                        className="blockquote app_banner_font"
                    >
                        "A letter can sometimes be short and sweet, and still, express important feelings."

                    </p>
                    <p
                        className="blockquote-footer app_banner_fontFooter"
                    >
                        Luculia Marlborough, <cite title="secondSource">Violet Evergarden</cite>
                    </p>
                </div>

            </div>

        </div>

    )
}

export default BannerTop;