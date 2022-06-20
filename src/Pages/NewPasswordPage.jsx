import React, { useState } from "react";
import { FormGroup, Input, Label, Button, InputGroup, InputGroupText } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const NewPasswordPage = (props) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confNewPassword, setConfNewPassword] = useState("");

    const [visibleForm, setVisibleForm] = React.useState({
        type: "password",
        text: "Show"
    })

    const handleVisible = () => {
        if (visibleForm.type === "password") {
            setVisibleForm({
                type: "text",
                text: "Hide"
            })
        } else {
            setVisibleForm({
                type: "password",
                text: "Show"
            })
        }
    }

    const handleReset = async () => {
        try {

            if (newPassword && confNewPassword) {
                if (newPassword == confNewPassword) {
                    let res = await Axios.patch(`${API_URL}/users/reset`, {
                        password: newPassword
                    }, {
                        headers: {
                            'Authorization': `Bearer ${params.token}`
                        }
                    })

                    if (res.data.success) {
                        navigate('/', { replace: true });
                    }
                } else {
                    alert("Your confirmation password is incorrect")
                }
            } else {
                alert("Please fill in all form")
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (<div
        className="container p-5"
    >
        <div
            className="col-12 col-md-6 mx-auto"
        >
            <span className="material-icons d-flex justify-content-center" style={{ color: "#147347", fontSize: "150px" }}>
                lock_reset
            </span>
            <FormGroup>
                <Label>Password</Label>
                <InputGroup>
                    <Input
                        type={visibleForm.type}
                        placeholder="Type new password here"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)} />
                    <InputGroupText className="btn btn-secondary" onClick={handleVisible}>
                        {visibleForm.text}
                    </InputGroupText>
                </InputGroup>
                <Label
                    className="mt-2"
                >Confirm Password</Label>
                <Input
                    type={visibleForm.type}
                    placeholder="Confirm new password here"
                    value={confNewPassword}
                    onChange={(event) => setConfNewPassword(event.target.value)} />
            </FormGroup>
            <Button
                className="w-100"
                type="button"
                color="success"
                onClick={handleReset}>Reset my password</Button>
        </div>
    </div>)
}

export default NewPasswordPage;