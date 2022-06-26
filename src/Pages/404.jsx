import React from "react";
import '../index.scss';
import { useSelector } from 'react-redux';

const NotFoundPage = (props) => {
    const { status } = useSelector((state) => {
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
            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                search_off
            </span>
            <h4>404 - The page you were looking for doesn't exist</h4>
            {/* {status === "unverified"
                ?
                <>
                    <h1>404 Not Found</h1>
                    <h1>Please verify your email to view this page</h1>
                </>
                :
                <>
                    <h1>404 Not Found</h1>
                </>
            } */}
        </div>
    )

}

export default NotFoundPage;