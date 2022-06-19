import React from "react";
import { Button } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch } from 'react-redux';
import { loginAction } from "../redux/actions/usersActions";
import { useParams, useNavigate } from 'react-router-dom';

const VerificationUser = (props) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVerify = async () => {
        try {
            let res = await Axios.patch(`${API_URL}/users/verification`, {}, {
                headers: {
                    'Authorization': `Bearer ${params.token}`
                }
            })

            if (res.data.success) {
                localStorage.setItem("tokenIdUser", res.data.token);
                dispatch(loginAction(res.data));
                navigate('/', { replace: true });
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (<div
        className="container d-flex justify-content-center p-4"
    >
        <div>
            <span className="material-icons d-flex justify-content-center" style={{ color: "#0C6EFD", fontSize: "150px" }}>
                security
            </span>
            <h4>Yeay! Thanks for signing up!</h4>
            <h5>Please verify you account to enable all features in our website</h5>
            <Button
                className="w-100 mx-auto mt-2"
                outline
                color="primary"
                onClick={handleVerify}
            >
                Click here to verify your account
            </Button>
        </div>
    </div>)
}

export default VerificationUser;