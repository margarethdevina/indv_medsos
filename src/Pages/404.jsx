import React from "react";
import { useSelector } from 'react-redux';

const NotFoundPage = (props) => {
    const { status } = useSelector((state) => {
        return {
            status: state.usersReducer.status
        }
    })
    
    return (
        <div>
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