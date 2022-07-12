import React from "react";
import { Helmet } from "react-helmet";

const MetaDecorator = ({
    title,
    description,
    contentImg,
    contentWebUrl,
    meta = [] }) => {

    return (
        <Helmet
            title={title}
            meta={[
                {
                    charSet: `utf-8`
                },
                {
                    httpEquiv: `X-UA-Compatible`,
                    content: `IE=edge`
                },
                {
                    property: `type`,
                    content: `website`
                },
                {
                    name: `description`,
                    content: description
                },
                {
                    property: `og:type`,
                    content: "website"
                },
                {
                    property: `og:title`,
                    content: title
                },
                {
                    property: `og:description`,
                    content: description
                },
                {
                    property: `og:image`,
                    content: contentImg
                },
                {
                    property: `og:image:width`,
                    content: `300`
                },
                {
                    property: `og:image:height`,
                    content: `300`
                },
                {
                    property: `og:url`,
                    content: contentWebUrl
                },
                {
                    property: `twitter:card`,
                    content: `summary_large_image`
                },
                {
                    property: `twitter:tittle`,
                    content: title
                },
                {
                    property: `twitter:description`,
                    content: description
                },
                {
                    property: `twitter:image`,
                    content: contentImg
                },
                {
                    property: `twitter:url`,
                    content: contentWebUrl
                }
            ]} />
    );
};

export default MetaDecorator;

