import React, { useState } from "react";
import { FormGroup, Input, Label, Button } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";
import './_PostDetail.scss';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetaDecorator from "../Components/MetaDecorator";

const ForgotPassword = (props) => {

    const navigate = useNavigate();

    const [buttonStatus, setButtonStatus] = useState(false)
    const [insertEmail, setInsertEmail] = useState("");

    const handleEmail = async () => {
        setButtonStatus(true);

        try {
            if (insertEmail) {
                let res = await Axios.post(`${API_URL}/users/forgot`, {
                    email: insertEmail
                })

                if (res.data.success) {
                    navigate("/", { replace: true });
                    toast.info("Reset password link sent. Please check your email inbox");
                    setButtonStatus(false);
                }
            } else {
                toast.warn("Please insert your registered email first");
                setButtonStatus(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (<div
        className="d-flex justify-content-center py-1 my-5"
        style={{ minHeight: "100vh" }}
    >

        {/* title Leiden | Request Reset Password */}
        <MetaDecorator
            title="Leiden | Request Reset Password"
            description="Don't worry if you forgot your password, you can request to reset your password"
            contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_HOME.jpg`}
        />

        <div
            className="pt-5"
        >
            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                contact_mail
            </span>
            <h3>Forgot your password?</h3>
            <FormGroup>
                <Label
                    className="mx-auto"
                >
                    Don't worry...insert your registered email below to get the reset password link
                </Label>
                <Input
                    className="mx-auto"
                    type="text"
                    placeholder="Insert your registered email"
                    value={insertEmail}
                    onChange={(event) => setInsertEmail(event.target.value)} />
            </FormGroup>
            <Button
                type="button"
                className="w-100 mt-1 _detail_button_post"
                onClick={handleEmail}
                disabled={buttonStatus}
            // color="success"
            >Request Reset Password</Button>
        </div>
    </div>)
}

export default ForgotPassword;