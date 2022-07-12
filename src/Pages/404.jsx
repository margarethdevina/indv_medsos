import React from "react";
import '../index.scss';
import { useSelector } from 'react-redux';
import MetaDecorator from "../Components/MetaDecorator";
import { API_URL} from "../helper";

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
                description="You have been redirected to this page because the page you were looking for doesn't exist"
                contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_HOME.jpg`}
            />

            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                search_off
            </span>
            <h4>404 - The page you were looking for doesn't exist</h4>

        </div>
    )

}

export default NotFoundPage;