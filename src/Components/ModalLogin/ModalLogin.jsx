import React, { useState, useEffect } from "react";
import {
    Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input, InputGroup, InputGroupText
} from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from "../../redux/actions/usersActions";

const ModalLogin = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get(`${API_URL}/users`)
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
            alert("Fill in all form")
        } else if (inForm.usernameOrEmail.includes("@")) {

            console.log("isi email", inForm.usernameOrEmail)
            console.log("inForm.password", inForm.password)

            Axios.get(`${API_URL}/users?email=${inForm.usernameOrEmail}&password=${inForm.password}`)
                .then((response) => {
                    console.log("data saat masuk lwt email", response.data)
                    localStorage.setItem("tokenIdUser", response.data[0].id)
                    dispatch(loginAction(response.data[0]))
                    props.toggleOpen();
                }).catch((error) => {
                    console.log(error);
                })

        } else if (!inForm.usernameOrEmail.includes("@")) {

            console.log("isi username", inForm.usernameOrEmail)
            console.log("inForm.password", inForm.password)

            Axios.get(`${API_URL}/users?username=${inForm.usernameOrEmail}&password=${inForm.password}`)
                .then((response) => {
                    console.log("data saat masuk lwt username", response.data)
                    localStorage.setItem("tokenIdUser", response.data[0].id)
                    dispatch(loginAction(response.data[0]))
                    props.toggleOpen();
                }).catch((error) => {
                    console.log(error);
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
                <h5
                    className="mb-4 mt-3 fw-bold"
                >
                    Login with your account
                </h5>
                <FormGroup>
                    <Label>Username or Email</Label>
                    <Input
                        type="text"
                        value={inForm.usernameOrEmail}
                        onChange={(event) => handleInput(event.target.value, "usernameOrEmail")}
                    />
                </FormGroup>
                <FormGroup>
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
                        >
                            Forgot Password?
                        </a>
                    </div>
                </FormGroup>
                <Button
                    type="button"
                    className="w-100 mt-2 mb-2"
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