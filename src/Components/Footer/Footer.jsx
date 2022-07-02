import React from "react";
import './_Footer.scss';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { ReactComponent as WaIcon } from '../../Assets/IconRef/icons8-whatsapp.svg';
import { ReactComponent as TwitterIcon } from '../../Assets/IconRef/icons8-twitter.svg';
import { ReactComponent as FbIcon } from '../../Assets/IconRef/icons8-facebook.svg';
// import MetaDecorator from "../MetaDecorator";

const FooterComponent = (props) => {

    return (
        <div id="footer">

            <div className="container">
                {/* <div>
                    <a
                        href="/"
                        className="footer__logo"
                    >
                        Leiden
                    </a>
                </div> */}

                <div className="footer__lists ms-0">
                    <p
                        className="copyright"
                    >
                        Copyright &copy; 2022 Leiden Co
                    </p>
                </div>

                <div className="footer__lists">
                    <ul>
                        <a href="/">Privacy</a>
                    </ul>
                    <ul>
                        <a href="/">Terms</a>
                    </ul>
                    {/* <ul> */}
                    {/* <li className="topic">Company</li> */}
                    {/* <li>
                            <a href="/">Privacy</a>
                        </li>
                        <li>
                            <a href="/">Terms</a>
                        </li> */}
                    {/* </ul> */}
                </div>

                <div className="footer__socials">
                    <WhatsappShareButton
                        url="http://localhost:3001/"
                        className="footer__socials__icons"
                    >
                        <WaIcon
                            className="footer__socials__icons"
                        />
                    </WhatsappShareButton>
                    <TwitterShareButton
                        url="http://localhost:3001/"
                        className="footer__socials__icons"
                    >
                        <TwitterIcon
                            className="footer__socials__icons"
                        />
                    </TwitterShareButton>
                    <FacebookShareButton
                        url="http://localhost:3001/"
                        className="footer__socials__icons"
                    >
                        <FbIcon
                            className="footer__socials__icons"
                        />
                    </FacebookShareButton>
                </div>

            </div>
        </div>
    )

}

export default FooterComponent;