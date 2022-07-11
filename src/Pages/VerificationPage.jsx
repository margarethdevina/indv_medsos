import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from "../redux/actions/usersActions";
import { useParams, useNavigate } from 'react-router-dom';
import './_PostDetail.scss';
import { toast } from "react-toastify";
import { DateTime } from 'luxon';
import MetaDecorator from "../Components/MetaDecorator";

const VerificationUser = (props) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [buttonStatus, setButtonStatus] = useState(false);
    const [dbToken, setDbToken] = useState([]);

    const { status } = useSelector((state) => {
        return {
            status: state.usersReducer.status,
        }
    })

    useEffect(() => {
        getToken();
    }, []);

    const getToken = () => {
        Axios.get(`${API_URL}/users/getToken`)
            .then((response) => {
                // console.log("isi dbToken", response.data);
                setDbToken(response.data);
            }).catch((error) => { console.log(error) })
    }

    const handleVerify = async () => {
        try {

            if (dbToken.find(valToken => valToken.token == params.token)) {

                let prevToken = dbToken.filter(val => val.token == params.token)[0];
                // console.log("prevToken", prevToken);

                let startDate = DateTime.fromISO(prevToken.editedDate);
                let endDate = DateTime.now();

                let diffInterval = endDate.diff(startDate, ['hours', 'minutes', 'seconds']).toObject();

                let { hours, minutes, seconds } = diffInterval;
                // console.log("diffInterval Token", diffInterval);

                if (hours > 1) {
                    toast.warn("Token has expired, please create a new resend verification link request");
                    setButtonStatus(true);

                } else {

                    let res = await Axios.patch(`${API_URL}/users/verification`, {}, {
                        headers: {
                            'Authorization': `Bearer ${params.token}`
                        }
                    })

                    if (res.data.success) {
                        localStorage.setItem("tokenIdUser", res.data.token);
                        dispatch(loginAction(res.data));
                        toast.success("Verification successful")
                        setButtonStatus(false);
                        navigate('/', { replace: true });
                    }

                }

            } else {

                if (status == "verified") {
                    toast.warn("You already verified your account");
                    setButtonStatus(true);
                } else {
                    toast.warn("Token has expired, please create a new resend verification link request");
                    setButtonStatus(true);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (<div
        className="container d-flex justify-content-center p-4"
        style={{ minHeight: "100vh" }}
    >

        {/* title Leiden | Verification Page */}
        <MetaDecorator
            title="Leiden | Verification Page"
            description="Please verify your account and enjoy our features"
            contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_VERIF.png`}
        />

        <div>
            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                security
            </span>
            <h4>Yeay! Thanks for signing up!</h4>
            <h5>Please verify you account to enable all features in our website</h5>
            <Button
                className="w-100 mx-auto mt-2 _detail_button_post"
                outline
                disabled={buttonStatus}
                onClick={handleVerify}
            >
                Click here to verify your account
            </Button>
        </div>
    </div>)
}

export default VerificationUser;