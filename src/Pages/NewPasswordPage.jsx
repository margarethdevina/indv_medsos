import React, { useState } from "react";
import { FormGroup, Input, Label, Button, InputGroup, InputGroupText } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './_PostDetail.scss';
import '../index.scss';
import { toast } from "react-toastify";
import MetaDecorator from "../Components/MetaDecorator";

const NewPasswordPage = (props) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confNewPassword, setConfNewPassword] = useState("");
    const [passStrength, setPassStrength] = useState("");

    /////// REGEX FUNCTIONS ///////
    const strongRegexPassword = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    const weakRegexPassword = new RegExp("^(((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})")
    const wrongRegexPassword = new RegExp("^(?=.*[a-z])(?=.{8,})")

    const validRegexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

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

    const handleNewPass = (value) => {
        setNewPassword(value)
        console.log(newPassword)

        if (strongRegexPassword.test(value)) {
            setPassStrength("✅ Strong Password")
        } else if (weakRegexPassword.test(value)) {
            setPassStrength("❗ Weak Password")
        } else if (wrongRegexPassword.test(value)) {
            setPassStrength("❌ Contain lowercase letter")
        }
        // console.log(passStrength)
    }

    const handleReset = async () => {
        try {

            if (newPassword && confNewPassword) {
                if (newPassword == confNewPassword) {
                    if (newPassword.length < 8) {
                        toast.warn("Password should contain at least 8 characters")
                    } else if (passStrength == "❌ Contain lowercase letter") {
                        // console.log("Password cannot contain lowercase letter")
                        toast.warn("Password cannot contain lowercase letter")
                    } else {
                        let res = await Axios.patch(`${API_URL}/users/reset`, {
                            password: newPassword
                        }, {
                            headers: {
                                'Authorization': `Bearer ${params.token}`
                            }
                        })

                        if (res.data.success) {
                            toast.success("New password has been saved");
                            setConfNewPassword("");
                            setNewPassword("");
                            setPassStrength("");
                            navigate('/', { replace: true });
                        }
                    }
                } else {
                    toast.warn("Your confirmation password is incorrect")
                }
            } else {
                toast.warn("Please fill in all form")
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (<div
        className="container p-5"
        style={{ minHeight: "100vh" }}
    >

        {/* title Leiden | New Password */}
        <MetaDecorator
            title="Leiden | New Password"
            description="Please fill in the new password, don't worry we will keep it safe"
            contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_HOME.jpg`}
        />

        <div
            className="col-12 col-md-6 mx-auto"
        >
            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                lock_reset
            </span>
            <FormGroup>
                <Label>Password</Label>
                <InputGroup>
                    <Input
                        type={visibleForm.type}
                        placeholder="Type new password here"
                        value={newPassword}
                        onChange={(event) => handleNewPass(event.target.value)} />
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
                <p
                    className="mb-0 text-start"
                    style={{ fontWeight: "lighter", fontSize: "12px" }}
                >
                    Password should contain at least 8 characters including an uppercase letter, a symbol (!@#$%^*), and a number.
                </p>
                <p
                    className="mb-0 text-start"
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                >
                    {passStrength}
                </p>
            </FormGroup>
            <Button
                className="w-100 _detail_button_post"
                type="button"
                // color="success"
                onClick={handleReset}>Reset my password</Button>
        </div>
    </div>)
}

export default NewPasswordPage;