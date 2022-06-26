import React, { useState, useEffect } from "react";
import '../../index.scss';
import {
    Modal, ModalBody, Button, FormGroup, Label, Input, InputGroup, InputGroupText
} from 'reactstrap';
import { toast } from "react-toastify";
import Axios from 'axios';
import { API_URL } from '../../helper';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from "../../redux/actions/usersActions";

const ModalLogin = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get(`${API_URL}/users/get`)
            .then((response) => {
                dispatch(loginAction(response.data))
            }).catch((error) => {
                console.log(error);
            })
    }

    const [inForm, setInForm] = React.useState({
        usernameOrEmail: "",
        password: ""
    })

    const handleInput = (value, property) => {
        setInForm({ ...inForm, [property]: value })
    }

    const handleLogin = () => {
        if (inForm.usernameOrEmail == "" || inForm.password == "") {
            console.log("Fill in all form")
            toast.warn("Fill in all form")
        } else if (inForm.usernameOrEmail.includes("@")) {

            console.log("isi email", inForm.usernameOrEmail)
            console.log("inForm.password", inForm.password)

            Axios.post(`${API_URL}/users/login`, {
                email: inForm.usernameOrEmail,
                password: inForm.password
            })
                .then((response) => {
                    console.log("data saat masuk lwt email", response.data)
                    localStorage.setItem("tokenIdUser", response.data.token)
                    dispatch(loginAction(response.data))
                    props.toggleOpen();
                    navigate("/", { replace: true });
                }).catch((error) => {
                    console.log(error)
                    toast.warn("Incorrect email or password");
                })

        } else if (!inForm.usernameOrEmail.includes("@")) {

            console.log("isi username", inForm.usernameOrEmail)
            console.log("inForm.password", inForm.password)

            Axios.post(`${API_URL}/users/login`, {
                username: inForm.usernameOrEmail,
                password: inForm.password
            })
                .then((response) => {
                    console.log("data saat masuk lwt username", response.data)
                    localStorage.setItem("tokenIdUser", response.data.token)
                    dispatch(loginAction(response.data))
                    props.toggleOpen();
                    navigate("/", { replace: true });
                }).catch((error) => {
                    console.log(error)
                    toast.warn("Incorrect username or password");
                })

        }

    }

    const [visibleForm, setVisibleForm] = useState({
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

    return (
        <Modal
            isOpen={props.modalOpen}
            toggle={props.toggleOpen}
        >

            <ModalBody>
                <p
                    className="mb-4 mt-1 gen_font_title"
                >
                    Login with your account
                </p>
                <FormGroup
                    className="gen_font_content"
                >
                    <Label>Username or Email</Label>
                    <Input
                        type="text"
                        value={inForm.usernameOrEmail}
                        onChange={(event) => handleInput(event.target.value, "usernameOrEmail")}
                    />
                </FormGroup>
                <FormGroup
                    className="gen_font_content"
                >
                    <Label>Password</Label>
                    <InputGroup>
                        <Input
                            type={visibleForm.type}
                            value={inForm.password}
                            onChange={(event) => handleInput(event.target.value, "password")}
                        />
                        <InputGroupText
                            className="btn btn-secondary"
                            onClick={handleVisible}
                        >
                            {/* Show */}
                            {visibleForm.text}
                        </InputGroupText>
                    </InputGroup>
                    <div
                        className="d-flex justify-content-end"
                    >
                        <a
                            className="btn p-0 text-muted"
                            href="/forgot"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </FormGroup>
                <Button
                    type="button"
                    className="w-100 mt-2 mb-2 gen_btn_success"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </ModalBody>

        </Modal>
    )

}

export default ModalLogin;