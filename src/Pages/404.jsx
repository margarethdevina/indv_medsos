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
            {status === "unverified"
                ?
                <>
                    <h1>404 Not Found</h1>
                    <h1>Please verify your email to view this page</h1>
                </>
                :
                <>
                    <h1>404 Not Found</h1>
                </>
            }
        </div>
    )

}

export default NotFoundPage;