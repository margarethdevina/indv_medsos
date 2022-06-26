import React from "react";
import '../index.scss';
import { useSelector } from 'react-redux';

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
            {username
                ?
                <>
                    <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                        search_off
                    </span>
                    <h4>403 - Your account already registered and signed in</h4>
                </>
                :
                <>
                    <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                        search_off
                    </span>
                    <h4>404 - The page you were looking for doesn't exist</h4>
                </>
            }
        </div>
    )

}

export default NotFoundPage;