import React from "react";
import './_Footer.scss';
import { ReactComponent as WaIcon } from '../../Assets/IconRef/icons8-whatsapp.svg';
import { ReactComponent as TwitterIcon } from '../../Assets/IconRef/icons8-twitter.svg';
import { ReactComponent as FbIcon } from '../../Assets/IconRef/icons8-facebook.svg';

const FooterComponent = (props) => {


    return (
        <div id="footer">
            <div className="container">
                <div>
                    <a
                        href="/"
                        className="footer__logo"
                    >
                        Leiden
                    </a>
                </div>
                <div className="footer__lists">
                    <ul>

                        <li className="topic">Company</li>

                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Our Team</a>
                        </li>
                        <li>
                            <a href="#">Careers</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>

                    </ul>
                    {/* <ul>
                        
                        <li className="topic">Features</li>

                        <li>
                            <a href="#">Your Posts</a>
                        </li>
                        <li>
                            <a href="#">All Posts</a>
                        </li>
                        
                    </ul> */}
                </div>

                <div className="footer__socials">
                    <WaIcon
                        className="footer__socials__icons"
                    />
                    <TwitterIcon
                        className="footer__socials__icons"
                    />
                    <FbIcon
                        className="footer__socials__icons"
                    />
                </div>
            </div>
        </div>
    )

}

export default FooterComponent;