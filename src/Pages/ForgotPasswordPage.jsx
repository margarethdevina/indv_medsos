import React, { useState } from "react";
import { FormGroup, Input, Label, Button } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";

const ForgotPassword = (props) => {

    const [insertEmail, setInsertEmail] = useState("");

    const handleEmail = async () => {
        try {
            if (insertEmail){
                let res = await Axios.post(`${API_URL}/users/forgot`, {
                    email: insertEmail
                })
    
                if (res.data.success) {
                    alert("Reset password link sent. Please check your email inbox")
                }
            } else {
                alert("Please insert your registered email first")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (<div
        className="d-flex justify-content-center py-1 my-5"
    >
        <div
            className="pt-5"
        >
            <span className="material-icons d-flex justify-content-center" style={{ color: "#147347", fontSize: "150px" }}>
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
                className="w-100 mt-1"
                onClick={handleEmail}
                color="success"
            >Request Reset Password</Button>
        </div>
    </div>)
}

export default ForgotPassword;